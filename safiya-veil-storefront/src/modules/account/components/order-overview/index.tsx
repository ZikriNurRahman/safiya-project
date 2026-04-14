"use client"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b pb-6 last:pb-0 last:border-none"
            style={{ borderColor: "#e8e0d5" }}
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-6 py-12 border text-center"
      style={{ backgroundColor: "#faf8f5", borderColor: "#e8e0d5" }}
      data-testid="no-orders-container"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f5f0eb" }}>
        <span className="text-2xl" style={{ color: "#c9a96e" }}>◇</span>
      </div>
      <div>
        <h2 className="text-base font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
          Belum Ada Pesanan
        </h2>
        <p className="text-sm font-light mt-1" style={{ color: "#6b6b6b" }}>
          Yuk mulai belanja koleksi hijab premium Safiya Veil!
        </p>
      </div>
      <LocalizedClientLink href="/store" passHref>
        <button
          className="px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
          data-testid="continue-shopping-button"
        >
          Mulai Belanja
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview