"use client"

import { HttpTypes } from "@medusajs/types"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div
      className="flex flex-col gap-y-6 p-6 border"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e8e0d5",
      }}
    >
      <h2
        className="text-sm font-semibold tracking-[0.15em] uppercase"
        style={{ color: "#1a1a1a" }}
      >
        Ringkasan Pesanan
      </h2>

      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />

      <LocalizedClientLink href={"/checkout?step=" + step} data-testid="checkout-button">
        <button
          className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
        >
          Lanjut ke Pembayaran
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary