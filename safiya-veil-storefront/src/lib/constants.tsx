import React from "react"
import { CreditCard } from "@medusajs/icons"
import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

// Komponen icon Midtrans (QRIS)
const MidtransIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4" y="4" width="5" height="5" fill="currentColor"/>
    <rect x="13" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="4" width="5" height="5" fill="currentColor"/>
    <rect x="2" y="13" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4" y="15" width="5" height="5" fill="currentColor"/>
    <rect x="13" y="13" width="3" height="3" fill="currentColor"/>
    <rect x="18" y="13" width="3" height="3" fill="currentColor"/>
    <rect x="13" y="18" width="3" height="3" fill="currentColor"/>
    <rect x="18" y="18" width="3" height="3" fill="currentColor"/>
  </svg>
)

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  // ─── Midtrans (Provider utama Safiya Veil) ───
  pp_midtrans_midtrans: {
    title: "Midtrans (Transfer Bank, QRIS, Kartu Kredit, dll)",
    icon: <MidtransIcon />,
  },

  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// Cek apakah provider adalah Midtrans
export const isMidtrans = (providerId?: string) => {
  return providerId === "pp_midtrans_midtrans"
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
