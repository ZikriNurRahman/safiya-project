"use client"

import { isMidtrans, isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    // ─── Midtrans Payment Button ───
    case isMidtrans(paymentSession?.provider_id):
      return (
        <MidtransPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )

    // ─── Stripe Payment Button ───
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )

    // ─── Manual / Testing Payment Button ───
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton
          notReady={notReady}
          data-testid={dataTestId}
        />
      )

    default:
      return (
        <Button disabled>
          Pilih metode pembayaran
        </Button>
      )
  }
}

// ─────────────────────────────────────────────────────────────
// MIDTRANS PAYMENT BUTTON
// ─────────────────────────────────────────────────────────────
const MidtransPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]
  // Ambil snap_token dari data sesi yang sudah di-generate backend
  const snapToken = paymentSession?.data?.snap_token as string | undefined

  const handleMidtransPayment = () => {
    setErrorMessage(null)

    // Validasi: snap_token harus ada
    if (!snapToken) {
      setErrorMessage("Token pembayaran tidak ditemukan. Coba refresh halaman.")
      return
    }

    // Validasi: Snap.js harus sudah ter-load
    if (typeof window === "undefined" || !window.snap) {
      setErrorMessage("Midtrans Snap belum siap. Coba beberapa saat lagi.")
      return
    }

    setSubmitting(true)

    // Buka popup Midtrans Snap
    window.snap.pay(snapToken, {
      language: "id", // Bahasa Indonesia

      // ✅ Pembayaran berhasil
      onSuccess: async (_result) => {
        try {
          await placeOrder()
        } catch (err: any) {
          setErrorMessage(err.message || "Gagal membuat pesanan.")
          setSubmitting(false)
        }
      },

      // ⏳ Pembayaran pending (transfer bank, dll)
      onPending: async (_result) => {
        try {
          // Tetap buat order meski pending (akan dikonfirmasi via webhook)
          await placeOrder()
        } catch (err: any) {
          setErrorMessage(err.message || "Gagal membuat pesanan.")
          setSubmitting(false)
        }
      },

      // ❌ Pembayaran error
      onError: (result) => {
        setErrorMessage(
          result.status_message || "Pembayaran gagal. Coba lagi."
        )
        setSubmitting(false)
      },

      // 🚪 User menutup popup tanpa bayar
      onClose: () => {
        setSubmitting(false)
      },
    })
  }

  return (
    <>
      <button
        onClick={handleMidtransPayment}
        disabled={notReady || submitting || !snapToken}
        className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: submitting ? "#6b6b6b" : "#1a1a1a",
          color: "#f5f0eb",
        }}
        data-testid={dataTestId}
      >
        {submitting ? "Memproses..." : "Bayar Sekarang"}
      </button>

      {/* Info metode pembayaran yang tersedia */}
      {!submitting && (
        <p className="text-xs text-center mt-2" style={{ color: "#6b6b6b" }}>
          Transfer Bank • QRIS • GoPay • ShopeePay • Kartu Kredit • dan lainnya
        </p>
      )}

      <ErrorMessage
        error={errorMessage}
        data-testid="midtrans-payment-error-message"
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// STRIPE PAYMENT BUTTON (tetap ada sebagai fallback)
// ─────────────────────────────────────────────────────────────
const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setSubmitting(false))
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")
  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )
  const disabled = !stripe || !elements

  const handlePayment = async () => {
    setSubmitting(true)
    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${cart.billing_address?.first_name} ${cart.billing_address?.last_name}`,
            email: cart.email,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent
          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }
          setErrorMessage(error.message || null)
          return
        }
        if (
          paymentIntent?.status === "requires_capture" ||
          paymentIntent?.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Buat Pesanan
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// MANUAL TEST PAYMENT BUTTON (untuk testing di development)
// ─────────────────────────────────────────────────────────────
const ManualTestPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    await placeOrder()
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setSubmitting(false))
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId}
      >
        Buat Pesanan (Test)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton