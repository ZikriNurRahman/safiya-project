// Konfigurasi yang dipass dari medusa-config.ts
export type MidtransOptions = {
  serverKey: string    // Server key dari Midtrans Dashboard
  clientKey: string    // Client key dari Midtrans Dashboard
  isProduction: boolean // false = sandbox, true = production
}

// Status transaksi dari Midtrans API
export type MidtransTransactionStatus =
  | "capture"         // Kartu kredit berhasil di-capture
  | "settlement"      // Pembayaran lunas
  | "pending"         // Menunggu pembayaran (transfer bank, dll)
  | "deny"            // Ditolak
  | "cancel"          // Dibatalkan
  | "expire"          // Kadaluarsa
  | "refund"          // Dikembalikan
  | "partial_refund"  // Sebagian dikembalikan
  | "authorize"       // Diotorisasi (belum di-capture)

// Payload notifikasi dari Midtrans Webhook
export type MidtransNotification = {
  transaction_id: string
  order_id: string
  gross_amount: string
  payment_type: string
  transaction_status: MidtransTransactionStatus
  fraud_status?: string
  signature_key?: string
  status_code: string
  currency: string
  transaction_time: string
}