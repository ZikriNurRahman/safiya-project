import {
  AbstractPaymentProvider,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import MidtransClient from "midtrans-client"
import crypto from "crypto"
import {
  MidtransOptions,
  MidtransNotification,
  MidtransTransactionStatus,
} from "./types"

import { 
  InitiatePaymentInput, 
  InitiatePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput, // ✅ Ditambahkan
  ProviderWebhookPayload,
  WebhookActionResult
} from "@medusajs/framework/types"

class MidtransPaymentService extends AbstractPaymentProvider<MidtransOptions> {
  static identifier = "midtrans"

  protected options_: MidtransOptions
  protected snap_: MidtransClient.Snap
  protected coreApi_: MidtransClient.CoreApi

  constructor(container: any, options: MidtransOptions) {
    super(container, options)
    this.options_ = options

    this.snap_ = new MidtransClient.Snap({
      isProduction: options.isProduction,
      serverKey: options.serverKey,
      clientKey: options.clientKey,
    })

    this.coreApi_ = new MidtransClient.CoreApi({
      isProduction: options.isProduction,
      serverKey: options.serverKey,
      clientKey: options.clientKey,
    })
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    try {
      const transactionAmount = Number(input.amount)
      const paymentContext = input.context as any
      const cart = paymentContext?.cart

      const orderId = `SAFIYA-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

      const transactionDetails = {
        order_id: orderId,
        gross_amount: Math.round(transactionAmount),
      }

      const customerDetails = {
        first_name: cart?.shipping_address?.first_name || "Customer",
        last_name: cart?.shipping_address?.last_name || "",
        email: cart?.email || "customer@example.com",
        phone: cart?.shipping_address?.phone || "",
      }

      const itemDetails = cart?.items?.map((item: any) => ({
        id: item.title?.toLowerCase().replace(/\s/g, "-") || "item",
        price: Math.round(Number(item.unit_price || 0)),
        quantity: item.quantity || 1,
        name: item.title || "Produk Safiya Veil",
      })) || []

      const parameter = {
        transaction_details: transactionDetails,
        customer_details: customerDetails,
        item_details: itemDetails.length > 0 ? itemDetails : undefined,
        callbacks: {
          finish: `${process.env.STORE_URL || "http://localhost:3000"}/id/order/confirmed`,
        },
        enabled_payments: [
          "credit_card", "bca_va", "bni_va", "bri_va", "mandiri_va",
          "permata_va", "other_va", "gopay", "qris", "shopeepay",
        ],
      }

      const transaction = await this.snap_.createTransaction(parameter)

      return {
        id: orderId,
        data: {
          snap_token: transaction.token,
          snap_redirect_url: transaction.redirect_url,
          order_id: orderId,
        },
      }
    } catch (error: any) {
      throw new Error(error.message || "Gagal membuat transaksi Midtrans")
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    const res = await this.initiatePayment(input as unknown as InitiatePaymentInput)
    return res as unknown as UpdatePaymentOutput
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    try {
      const { status } = await this.getPaymentStatus({ data: input.data } as GetPaymentStatusInput)
      return { data: input.data, status }
    } catch (error) {
      return { data: input.data, status: PaymentSessionStatus.PENDING }
    }
  }

  // ✅ PERUBAHAN: Return type diubah menjadi GetPaymentStatusOutput dan mengembalikan Object { status: ... }
  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    try {
      const orderId = input.data?.order_id as string
      if (!orderId) return { status: PaymentSessionStatus.PENDING }

      // ✅ PERUBAHAN: Ditambahkan 'as any' untuk mengakali tipe data midtrans-client yang kurang lengkap
      const response = await (this.coreApi_ as any).transaction.status(orderId)
      const { transaction_status, fraud_status } = response as {
        transaction_status: MidtransTransactionStatus
        fraud_status?: string
      }

      switch (transaction_status) {
        case "capture":
          if (fraud_status === "accept") return { status: PaymentSessionStatus.AUTHORIZED }
          if (fraud_status === "challenge") return { status: PaymentSessionStatus.REQUIRES_MORE }
          return { status: PaymentSessionStatus.PENDING }
        case "settlement":
          return { status: PaymentSessionStatus.AUTHORIZED }
        case "pending":
          return { status: PaymentSessionStatus.PENDING }
        case "authorize":
          return { status: PaymentSessionStatus.REQUIRES_MORE }
        case "deny":
        case "cancel":
        case "expire":
          return { status: PaymentSessionStatus.ERROR }
        default:
          return { status: PaymentSessionStatus.PENDING }
      }
    } catch {
      return { status: PaymentSessionStatus.PENDING }
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    try {
      const orderId = input.data?.order_id as string
      if (orderId) {
        try {
          // ✅ PERUBAHAN: Ditambahkan 'as any'
          await (this.coreApi_ as any).transaction.capture(orderId)
        } catch { }
      }
      return { data: { ...input.data, captured: true } }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    try {
      const orderId = input.data?.order_id as string
      if (orderId) {
        // ✅ PERUBAHAN: Ditambahkan 'as any'
        await (this.coreApi_ as any).transaction.refund(orderId, {
          amount: Math.round(Number(input.amount)),
          reason: "Permintaan pengembalian dana",
        })
      }
      return { data: { ...input.data, refunded_amount: input.amount } }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    try {
      const orderId = input.data?.order_id as string
      if (!orderId) return { data: input.data }
      
      // ✅ PERUBAHAN: Ditambahkan 'as any'
      const status = await (this.coreApi_ as any).transaction.status(orderId)
      return { data: { ...input.data, ...(status as object) } }
    } catch {
      return { data: input.data }
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    try {
      const orderId = input.data?.order_id as string
      if (orderId) {
        // ✅ PERUBAHAN: Ditambahkan 'as any'
        await (this.coreApi_ as any).transaction.cancel(orderId)
      }
      return { data: { ...input.data, canceled: true } }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return await this.cancelPayment(input as unknown as CancelPaymentInput)
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    const data = payload.data as unknown as MidtransNotification
    const serverKey = this.options_.serverKey
    
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${data.order_id}${data.status_code}${data.gross_amount}${serverKey}`)
      .digest("hex")

    if (expectedSignature !== data.signature_key) {
      return { action: "not_supported" }
    }

    const { transaction_status, fraud_status } = data

    if ((transaction_status === "capture" && fraud_status === "accept") || transaction_status === "settlement") {
      return {
        action: "authorized",
        data: { session_id: data.order_id, amount: Math.round(parseFloat(data.gross_amount)) },
      }
    }

    if (["deny", "cancel", "expire"].includes(transaction_status)) {
      return { action: "failed", data: { session_id: data.order_id, amount: 0 } }
    }

    return { action: "not_supported" }
  }
}

export default MidtransPaymentService