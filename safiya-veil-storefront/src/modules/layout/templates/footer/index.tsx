import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer
      className="border-t w-full"
      // Background cream untuk konsistensi dengan navbar
      style={{ backgroundColor: "#f5f0eb", borderColor: "#e8e0d5" }}
    >
      <div className="content-container flex flex-col w-full">

        {/* Main Footer Content */}
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-16">

          {/* Kiri - Brand Info */}
          <div className="flex flex-col gap-y-3">
            <LocalizedClientLink href="/">
              {/* Nama brand */}
              <span
                className="text-lg font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#1a1a1a" }}
              >
                Safiya Veil
              </span>
            </LocalizedClientLink>

            {/* Tagline */}
            <p
              className="text-xs tracking-[0.15em] uppercase"
              style={{ color: "#c9a96e" }}
            >
              Pure In Faith, Grace In Style
            </p>

            {/* Deskripsi singkat */}
            <p
              className="text-sm max-w-xs leading-relaxed mt-2"
              style={{ color: "#6b6b6b" }}
            >
              Brand hijab premium yang menghadirkan
              koleksi modest fashion berkualitas tinggi
              untuk wanita muslimah modern.
            </p>
          </div>

          {/* Kanan - Links */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">

            {/* Kategori Produk */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#1a1a1a" }}
                >
                  Kategori
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return null

                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                          style={{ color: "#6b6b6b" }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Koleksi */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#1a1a1a" }}
                >
                  Koleksi
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                        href={`/collections/${c.handle}`}
                        style={{ color: "#6b6b6b" }}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Informasi */}
            <div className="flex flex-col gap-y-3">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#1a1a1a" }}
              >
                Informasi
              </span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <LocalizedClientLink
                    className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                    href="/about"
                    style={{ color: "#6b6b6b" }}
                  >
                    Tentang Kami
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                    href="/contact"
                    style={{ color: "#6b6b6b" }}
                  >
                    Hubungi Kami
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                    href="/shipping"
                    style={{ color: "#6b6b6b" }}
                  >
                    Info Pengiriman
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm hover:text-[#c9a96e] transition-colors duration-200"
                    href="/returns"
                    style={{ color: "#6b6b6b" }}
                  >
                    Pengembalian
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Footer - Copyright */}
        <div
          className="flex w-full mb-8 pt-6 justify-between items-center border-t"
          style={{ borderColor: "#e8e0d5" }}
        >
          <Text
            className="text-xs tracking-wide"
            style={{ color: "#6b6b6b" }}
          >
            © {new Date().getFullYear()} Safiya Veil. All rights reserved.
          </Text>

          {/* Social Media Links */}
          <div className="flex gap-x-4">
            <a
              href="https://instagram.com/safiyaveil"
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-wide hover:text-[#c9a96e] transition-colors duration-200"
              style={{ color: "#6b6b6b" }}
            >
              Instagram
            </a>
            <a
              href="https://shopee.co.id/safiyaveil"
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-wide hover:text-[#c9a96e] transition-colors duration-200"
              style={{ color: "#6b6b6b" }}
            >
              Shopee
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}