import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      {/* Page Header */}
      <div
        className="w-full py-16 border-b text-center"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e8e0d5"
        }}
      >
        <div className="content-container">
          {/* Breadcrumb */}
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "#c9a96e" }}
          >
            Beranda / Semua Produk
          </p>

          {/* Title */}
          <h1
            className="text-4xl small:text-5xl font-light tracking-wide"
            style={{ color: "#1a1a1a" }}
          >
            Koleksi Kami
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
          </div>

          {/* Tagline */}
          <p
            className="text-sm font-light mt-4 tracking-wide"
            style={{ color: "#6b6b6b" }}
          >
            Temukan hijab premium pilihan untuk tampilan elegan sehari-hari
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col small:flex-row small:items-start py-12 content-container gap-8"
        data-testid="category-container"
      >
        {/* Sidebar Filter */}
        <div
          className="small:min-w-[220px] border p-6"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e8e0d5"
          }}
        >
          {/* Filter Title */}
          <h3
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 pb-4 border-b"
            style={{
              color: "#1a1a1a",
              borderColor: "#e8e0d5"
            }}
          >
            Filter & Urutkan
          </h3>

          <RefinementList
            sortBy={sort}
            data-testid="sort-by-container"
          />
        </div>

        {/* Products Area */}
        <div className="w-full">
          {/* Products Header */}
          <div
            className="flex items-center justify-between mb-8 pb-4 border-b"
            style={{ borderColor: "#e8e0d5" }}
          >
            <h2
              className="text-sm font-semibold tracking-[0.15em] uppercase"
              style={{ color: "#1a1a1a" }}
            >
              Semua Produk
            </h2>
            <span
              className="text-xs tracking-wide"
              style={{ color: "#6b6b6b" }}
            >
              Pure in Faith, Grace in Style
            </span>
          </div>

          {/* Products Grid */}
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                {/* Loading spinner */}
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: "#c9a96e", borderTopColor: "transparent" }}
                />
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#6b6b6b" }}
                >
                  Memuat produk...
                </p>
              </div>
            </div>
          }>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate