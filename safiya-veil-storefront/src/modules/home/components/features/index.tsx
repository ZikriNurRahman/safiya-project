"use client"

import { StaggerContainer, StaggerItem, FadeUp } from "@modules/common/components/motion-wrapper"

const features = [
  {
    icon: "✦",
    title: "Bahan Premium",
    description: "Setiap produk dibuat dari bahan pilihan yang nyaman, adem, dan tahan lama untuk aktivitas sehari-hari."
  },
  {
    icon: "◈",
    title: "Desain Elegan",
    description: "Koleksi kami dirancang dengan sentuhan modern yang tetap mempertahankan nilai kesopanan dan keanggunan."
  },
  {
    icon: "◇",
    title: "Pengiriman Cepat",
    description: "Kami memastikan setiap pesanan dikemas dengan rapi dan dikirim dengan cepat ke seluruh Indonesia."
  },
  {
    icon: "○",
    title: "Garansi Kualitas",
    description: "Kepuasan pelanggan adalah prioritas kami. Produk tidak sesuai? Kami siap membantu pengembalian."
  },
]

const Features = () => {
  return (
    <section
      className="py-24 w-full"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content-container">

        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Mengapa Safiya Veil
          </span>
          <h2
            className="text-3xl small:text-4xl font-light mt-3 tracking-wide"
            style={{ color: "#1a1a1a" }}
          >
            Kualitas Yang Kami Janjikan
          </h2>
          {/* Garis dekoratif */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
          </div>
        </FadeUp>

        {/* Features Grid */}
        <StaggerContainer className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div
                className="flex flex-col items-center text-center p-8 border transition-all duration-300 hover:shadow-lg group"
                style={{
                  borderColor: "#e8e0d5",
                  backgroundColor: "#faf8f5"
                }}
              >
                {/* Icon */}
                <span
                  className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: "#c9a96e" }}
                >
                  {feature.icon}
                </span>

                {/* Title */}
                <h3
                  className="text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "#1a1a1a" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "#6b6b6b" }}
                >
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}

export default Features