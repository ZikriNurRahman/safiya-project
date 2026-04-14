import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12 min-h-screen" style={{ backgroundColor: "#f5f0eb" }}>
      {/* Header */}
      <div
        className="w-full py-10 border-b text-center mb-8"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        <div className="content-container">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Safiya Veil
          </span>
          <h1
            className="text-3xl font-light tracking-wide mt-2"
            style={{ color: "#1a1a1a" }}
          >
            Keranjang Belanja
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
          </div>
        </div>
      </div>

      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-8">
            {/* Kiri - Items */}
            <div
              className="flex flex-col gap-y-6 p-6 border"
              style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
            >
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>

            {/* Kanan - Summary */}
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <Summary cart={cart as any} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="border"
            style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
          >
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate