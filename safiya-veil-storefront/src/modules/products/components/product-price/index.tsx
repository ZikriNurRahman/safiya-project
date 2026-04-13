import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div
        className="block w-32 h-8 animate-pulse rounded"
        style={{ backgroundColor: "#e8e0d5" }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-y-2">

      {/* Harga utama */}
      <span
        className={clx("text-2xl font-light tracking-wide", {
          // Warna gold kalau sedang sale
          "text-[#c9a96e]": selectedPrice.price_type === "sale",
        })}
        style={{
          color: selectedPrice.price_type === "sale" ? "#c9a96e" : "#1a1a1a"
        }}
      >
        {/* Tampilkan "Mulai dari" kalau belum pilih variant */}
        {!variant && (
          <span
            className="text-sm font-light mr-1"
            style={{ color: "#6b6b6b" }}
          >
            Mulai dari{" "}
          </span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>

      {/* Harga coret kalau sale */}
      {selectedPrice.price_type === "sale" && (
        <div className="flex flex-col gap-y-1">
          <p className="text-sm">
            <span style={{ color: "#6b6b6b" }}>Harga normal: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
              style={{ color: "#6b6b6b" }}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          {/* Badge diskon */}
          <span
            className="text-xs px-2 py-1 w-fit tracking-wide"
            style={{
              backgroundColor: "#c9a96e",
              color: "#ffffff"
            }}
          >
            Hemat {selectedPrice.percentage_diff}%
          </span>
        </div>
      )}

    </div>
  )
}