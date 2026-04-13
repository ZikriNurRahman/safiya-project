import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      {/* Breadcrumb */}
      <div
        className="w-full py-4 border-b"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        <div className="content-container">
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "#6b6b6b" }}
          >
            Beranda{" "}
            <span style={{ color: "#c9a96e" }}>/ Produk /</span>{" "}
            {product.title}
          </p>
        </div>
      </div>

      {/* Product Detail */}
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-12 gap-12"
        data-testid="product-container"
      >
        {/* Kiri - Product Info & Tabs */}
        <div className="flex flex-col small:sticky small:top-24 small:max-w-[280px] w-full gap-y-8">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>

        {/* Tengah - Image Gallery */}
        <div className="block w-full relative">
          <ImageGallery images={images} />
        </div>

        {/* Kanan - Product Actions */}
        <div className="flex flex-col small:sticky small:top-24 small:max-w-[280px] w-full gap-y-8">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* Related Products */}
      <div
        className="w-full py-16 border-t mt-8"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e8e0d5"
        }}
        data-testid="related-products-container"
      >
        <div className="content-container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a96e" }}
            >
              Pilihan Lainnya
            </span>
            <h2
              className="text-2xl small:text-3xl font-light mt-3 tracking-wide"
              style={{ color: "#1a1a1a" }}
            >
              Produk Terkait
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            </div>
          </div>

          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate