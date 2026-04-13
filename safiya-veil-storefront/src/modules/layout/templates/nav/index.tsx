import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className="relative h-16 mx-auto border-b duration-200 border-[#e8e0d5]"
        // Background cream warm untuk nuansa neutral & elegan
        style={{ backgroundColor: "#f5f0eb" }}
      >
        <nav className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full">

          {/* Kiri - Side Menu (hamburger di mobile) */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          {/* Tengah - Logo Safiya Veil */}
          <div className="flex flex-col items-center h-full justify-center">
            <LocalizedClientLink
              href="/"
              data-testid="nav-store-link"
              className="flex flex-col items-center"
            >
              {/* Nama brand dengan font elegan */}
              <span
                className="text-lg font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#1a1a1a", fontFamily: "sans-serif" }}
              >
                Safiya Veil
              </span>
              {/* Tagline kecil di bawah nama */}
              <span
                className="text-[9px] tracking-[0.15em] uppercase"
                style={{ color: "#c9a96e" }}
              >
                Pure In Faith, Grace In Style
              </span>
            </LocalizedClientLink>
          </div>

          {/* Kanan - Account & Cart */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-sm tracking-wide hover:text-[#c9a96e] transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
                style={{ color: "#1a1a1a" }}
              >
                Akun
              </LocalizedClientLink>
            </div>

            {/* Cart button dengan styling custom */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-sm tracking-wide hover:text-[#c9a96e] transition-colors duration-200 flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                  style={{ color: "#1a1a1a" }}
                >
                  Keranjang (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>

        </nav>
      </header>
    </div>
  )
}