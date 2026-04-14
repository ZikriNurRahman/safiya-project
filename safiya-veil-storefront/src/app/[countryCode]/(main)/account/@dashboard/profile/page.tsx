import { Metadata } from "next"
import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Pesanan - Safiya Veil",
  description: "riwayat pesanan kamu di Safiya Veil.",
}

export default async function Orders() {
  const orders = await listOrders()
  if (!orders) notFound()

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-2">
        <h1 className="text-xl font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
          Pesanan Saya
        </h1>
        <p className="text-sm font-light" style={{ color: "#6b6b6b" }}>
          Lihat riwayat dan status pesanan kamu. Kamu juga bisa mengajukan pengembalian jika diperlukan.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-12" />
        <TransferRequestForm />
      </div>
    </div>
  )
}