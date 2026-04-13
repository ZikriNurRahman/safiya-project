import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group"
    >
      <div
        className="flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-md"
        style={{ borderColor: "#e8e0d5", backgroundColor: "#ffffff" }}
        data-testid="product-wrapper"
      >
        {/* Product Image */}
        <div className="overflow-hidden relative">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: "rgba(26, 26, 26, 0.15)" }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300"
              style={{
                backgroundColor: "#f5f0eb",
                color: "#1a1a1a"
              }}
            >
              Lihat Detail
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div
          className="flex flex-col gap-2 p-4 border-t"
          style={{ borderColor: "#e8e0d5" }}
        >
          {/* Product Title */}
          <p
            className="text-sm font-light tracking-wide transition-colors duration-200 group-hover:text-[#c9a96e]"
            style={{ color: "#1a1a1a" }}
            data-testid="product-title"
          >
            {product.title}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            {cheapestPrice && (
              <div
                className="text-sm font-semibold"
                style={{ color: "#1a1a1a" }}
              >
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}

            {/* Arrow indicator */}
            <span
              className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
              style={{ color: "#c9a96e" }}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}