import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div className="mt-6 pt-6 border-t" style={{ borderColor: "#e8e0d5" }}>
      <h3 className="text-sm font-semibold tracking-wide mb-3" style={{ color: "#1a1a1a" }}>
        Butuh Bantuan?
      </h3>
      <ul className="flex flex-col gap-y-2 text-sm font-light" style={{ color: "#6b6b6b" }}>
        <li>
          <LocalizedClientLink
            href="/contact"
            className="hover:text-[#c9a96e] transition-colors duration-200"
          >
            Hubungi Kami
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink
            href="/contact"
            className="hover:text-[#c9a96e] transition-colors duration-200"
          >
            Pengembalian & Penukaran
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

export default Help