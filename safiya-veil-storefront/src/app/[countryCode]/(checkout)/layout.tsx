import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen" style={{ backgroundColor: "#f5f0eb" }}>
      {/* Navbar Checkout */}
      <div className="h-16 border-b" style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}>
        <nav className="flex h-full items-center content-container justify-between">
          {/* Kembali ke Keranjang */}
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 uppercase flex-1 basis-0 text-sm tracking-wide transition-colors duration-200"
            style={{ color: "#6b6b6b" }}
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="hidden small:block">Kembali ke Keranjang</span>
            <span className="block small:hidden">Kembali</span>
          </LocalizedClientLink>

          {/* Logo Safiya Veil */}
          <LocalizedClientLink href="/" className="flex flex-col items-center">
            <span
              className="text-lg font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#1a1a1a" }}
            >
              Safiya Veil
            </span>
            <span
              className="text-[9px] tracking-[0.15em] uppercase"
              style={{ color: "#c9a96e" }}
            >
              Pure In Faith, Grace In Style
            </span>
          </LocalizedClientLink>

          <div className="flex-1 basis-0" />
        </nav>
      </div>

      <div className="relative" data-testid="checkout-container">
        {children}
      </div>

      {/* Footer minimal */}
      <div
        className="py-4 w-full flex items-center justify-center border-t text-xs tracking-wide"
        style={{ borderColor: "#e8e0d5", color: "#6b6b6b" }}
      >
        © {new Date().getFullYear()} Safiya Veil. All rights reserved.
      </div>
    </div>
  )
}