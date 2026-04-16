// Type declarations untuk Midtrans Snap.js
// Snap.js di-load via CDN di layout.tsx

interface MidtransSnapResult {
  order_id: string
  payment_type: string
  transaction_status: string
  status_message: string
  fraud_status?: string
  finish_redirect_url?: string
}

interface MidtransSnapOptions {
  onSuccess?: (result: MidtransSnapResult) => void
  onPending?: (result: MidtransSnapResult) => void
  onError?: (result: MidtransSnapResult) => void
  onClose?: () => void
  language?: "id" | "en"
}

interface MidtransSnap {
  pay: (snapToken: string, options: MidtransSnapOptions) => void
  hide: () => void
}

interface Window {
  snap: MidtransSnap
}