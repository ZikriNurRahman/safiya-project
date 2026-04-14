import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-24 px-2 flex flex-col justify-center items-center text-center gap-6"
      data-testid="empty-cart-message"
    >
      {/* Icon keranjang */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#f5f0eb" }}
      >
        <span className="text-3xl" style={{ color: "#c9a96e" }}>◇</span>
      </div>

      <div className="flex flex-col gap-2">
        <h1
          className="text-2xl font-light tracking-wide"
          style={{ color: "#1a1a1a" }}
        >
          Keranjang Kosong
        </h1>
        <p
          className="text-sm font-light max-w-sm leading-relaxed"
          style={{ color: "#6b6b6b" }}
        >
          Kamu belum menambahkan produk apapun. Yuk mulai belanja koleksi hijab premium Safiya Veil!
        </p>
      </div>

      <LocalizedClientLink href="/store">
        <button
          className="px-10 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
        >
          Belanja Sekarang
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage