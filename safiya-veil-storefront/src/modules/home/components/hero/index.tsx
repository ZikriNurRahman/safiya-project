"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

// Floating particle component untuk background effect
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full"
    style={style}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: Math.random() * 3 + 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2,
    }}
  />
)

const Hero = () => {
  const [particles, setParticles] = useState<React.CSSProperties[]>([])

  useEffect(() => {
    // Generate particles hanya di client side
    const generated = Array.from({ length: 20 }, () => ({
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: "#c9a96e",
    }))
    setParticles(generated)
  }, [])

  return (
    <div
      className="h-[100vh] w-full relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      {/* Floating Particles */}
      {particles.map((style, i) => (
        <Particle key={i} style={style} />
      ))}

      {/* Decorative circles */}
      <motion.div
        className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
        style={{ backgroundColor: "#c9a96e", opacity: 0.08 }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full"
        style={{ backgroundColor: "#c9a96e", opacity: 0.06 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8 max-w-4xl">

        {/* Label badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase px-5 py-2 border rounded-full"
          style={{
            color: "#c9a96e",
            borderColor: "#c9a96e",
            backgroundColor: "rgba(201, 169, 110, 0.08)"
          }}
        >
          ✦ Koleksi Terbaru 2026 ✦
        </motion.span>

        {/* Heading */}
        <div className="flex flex-col gap-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl small:text-7xl font-light tracking-wide leading-tight"
            style={{ color: "#1a1a1a" }}
          >
            Tampil Anggun
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl small:text-7xl font-semibold tracking-wide leading-tight"
            style={{ color: "#1a1a1a" }}
          >
            Dengan{" "}
            <span style={{ color: "#c9a96e" }}>Safiya Veil</span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm tracking-[0.25em] uppercase"
          style={{ color: "#c9a96e" }}
        >
          Pure in Faith, Grace in Style
        </motion.p>

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-sm small:text-base leading-relaxed max-w-lg font-light"
          style={{ color: "#6b6b6b" }}
        >
          Temukan koleksi hijab premium kami yang dirancang khusus
          untuk wanita muslimah modern yang ingin tampil elegan
          dan tetap syar'i dalam setiap kesempatan.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col small:flex-row gap-4"
        >
          <LocalizedClientLink href="/store">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
            >
              Belanja Sekarang
            </motion.button>
          </LocalizedClientLink>

          <LocalizedClientLink href="/store">
            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "#1a1a1a",
                color: "#f5f0eb"
              }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-xs tracking-[0.2em] uppercase border transition-all duration-300"
              style={{
                borderColor: "#1a1a1a",
                color: "#1a1a1a",
                backgroundColor: "transparent"
              }}
            >
              Lihat Koleksi
            </motion.button>
          </LocalizedClientLink>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex gap-x-10 mt-4 pt-8 border-t w-full justify-center"
          style={{ borderColor: "#e8e0d5" }}
        >
          {[
            { value: "100+", label: "Produk" },
            { value: "500+", label: "Pelanggan" },
            { value: "4.9★", label: "Rating" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-y-1">
              <span
                className="text-2xl font-semibold"
                style={{ color: "#1a1a1a" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "#6b6b6b" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#6b6b6b" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{ backgroundColor: "#c9a96e" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

    </div>
  )
}

export default Hero