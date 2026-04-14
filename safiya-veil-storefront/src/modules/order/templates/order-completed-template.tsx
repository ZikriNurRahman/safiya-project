import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({ order }: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div
      className="py-12 min-h-screen"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      {/* Header */}
      <div
        className="w-full py-10 border-b text-center mb-8"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        <div className="content-container">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#c9a96e" }}>
            ✦ Pesanan Berhasil ✦
          </span>
          <h1 className="text-3xl font-light tracking-wide mt-2" style={{ color: "#1a1a1a" }}>
            Terima Kasih!
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
          </div>
          <p className="text-sm font-light mt-4" style={{ color: "#6b6b6b" }}>
            Pesananmu telah berhasil dibuat. Kami segera memproses pesananmu.
          </p>
        </div>
      </div>

      <div className="content-container flex flex-col items-center gap-y-6 max-w-4xl">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        <div
          className="flex flex-col gap-6 w-full p-8 border"
          style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
          data-testid="order-complete-container"
        >
          <OrderDetails order={order} />
          <Heading level="h2" className="flex flex-row text-3xl-regular">
            Ringkasan Pesanan
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}