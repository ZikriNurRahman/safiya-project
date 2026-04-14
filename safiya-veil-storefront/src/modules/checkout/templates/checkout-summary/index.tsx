import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      <div
        className="w-full flex flex-col border p-6"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row items-baseline text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          style={{ color: "#1a1a1a" }}
        >
          Ringkasan Pesanan
        </Heading>
        <Divider className="my-4"  />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary