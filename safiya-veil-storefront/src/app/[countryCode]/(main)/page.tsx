import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Features from "@modules/home/components/features"
import Banner from "@modules/home/components/banner"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

// Update metadata sesuai brand Safiya Veil
export const metadata: Metadata = {
  title: "Safiya Veil - Pure in Faith, Grace in Style",
  description:
    "Temukan koleksi hijab premium Safiya Veil. Brand modest fashion untuk wanita muslimah modern yang ingin tampil elegan dan tetap syar'i.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* Hero Section - Full screen landing */}
      <Hero />

      {/* Features Section - Keunggulan Safiya Veil */}
      <Features />

      {/* Featured Products - Produk unggulan */}
      <section
        className="py-24 w-full"
        style={{ backgroundColor: "#f5f0eb" }}
      >
        <div className="content-container">

          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a96e" }}
            >
              Pilihan Terbaik
            </span>
            <h2
              className="text-3xl small:text-4xl font-light mt-3 tracking-wide"
              style={{ color: "#1a1a1a" }}
            >
              Produk Unggulan
            </h2>
            {/* Garis dekoratif */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            </div>
          </div>

          {/* Products List */}
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>

        </div>
      </section>

      {/* Banner Section - Promo */}
      <Banner />

      {/* Testimonial Section */}
      <section
        className="py-24 w-full"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="content-container">

          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a96e" }}
            >
              Kata Mereka
            </span>
            <h2
              className="text-3xl small:text-4xl font-light mt-3 tracking-wide"
              style={{ color: "#1a1a1a" }}
            >
              Testimoni Pelanggan
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
              <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 small:grid-cols-3 gap-8">
            {[
              {
                name: "Aisyah R.",
                location: "Jakarta",
                rating: 5,
                text: "Kualitas hijabnya luar biasa! Bahannya adem dan nyaman dipakai seharian. Sudah beli 3 warna dan semuanya bagus!"
              },
              {
                name: "Fatimah N.",
                location: "Bandung",
                rating: 5,
                text: "Desainnya elegan dan modern. Cocok banget untuk ke kantor maupun acara formal. Pengirimannya juga cepat!"
              },
              {
                name: "Zahra M.",
                location: "Surabaya",
                rating: 5,
                text: "Sudah lama cari hijab dengan kualitas premium tapi harga terjangkau. Akhirnya ketemu Safiya Veil. Recommended banget!"
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 border"
                style={{
                  borderColor: "#e8e0d5",
                  backgroundColor: "#faf8f5"
                }}
              >
                {/* Rating bintang */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <span key={j} style={{ color: "#c9a96e" }}>★</span>
                  ))}
                </div>

                {/* Teks testimoni */}
                <p
                  className="text-sm leading-relaxed font-light italic"
                  style={{ color: "#6b6b6b" }}
                >
                  "{testimonial.text}"
                </p>

                {/* Info pelanggan */}
                <div
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: "#e8e0d5" }}
                >
                  {/* Avatar placeholder */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      backgroundColor: "#c9a96e",
                      color: "#ffffff"
                    }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wide"
                      style={{ color: "#1a1a1a" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "#6b6b6b" }}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Instagram/Social Section */}
      <section
        className="py-16 w-full border-t"
        style={{ backgroundColor: "#f5f0eb", borderColor: "#e8e0d5" }}
      >
        <div className="content-container text-center">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Follow Us
          </span>
          <h2
            className="text-2xl font-light mt-3 tracking-wide mb-2"
            style={{ color: "#1a1a1a" }}
          >
            @safiyaveil
          </h2>
          <p
            className="text-sm font-light mb-8"
            style={{ color: "#6b6b6b" }}
          >
            Tag kami di Instagram untuk tampil di halaman ini!
          </p>
          <a
            href="https://instagram.com/safiyaveil"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="px-8 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 hover:opacity-70"
              style={{
                borderColor: "#1a1a1a",
                color: "#1a1a1a",
                backgroundColor: "transparent"
              }}
            >
              Ikuti di Instagram
            </button>
          </a>
        </div>
      </section>
    </>
  )
}