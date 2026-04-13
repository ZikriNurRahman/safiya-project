import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-5">

        {/* Collection link */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:opacity-70"
            style={{ color: "#c9a96e" }}
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* Decorative line */}
        <div className="h-px w-8" style={{ backgroundColor: "#c9a96e" }} />

        {/* Product Title */}
        <h1
          className="text-2xl small:text-3xl font-light tracking-wide leading-snug"
          style={{ color: "#1a1a1a" }}
          data-testid="product-title"
        >
          {product.title}
        </h1>

        {/* Product Description */}
        {product.description && (
          <p
            className="text-sm leading-relaxed font-light whitespace-pre-line"
            style={{ color: "#6b6b6b" }}
            data-testid="product-description"
          >
            {product.description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-3 py-1 tracking-wide"
                style={{
                  backgroundColor: "#f5f0eb",
                  color: "#6b6b6b",
                  border: "1px solid #e8e0d5"
                }}
              >
                {tag.value}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductInfo