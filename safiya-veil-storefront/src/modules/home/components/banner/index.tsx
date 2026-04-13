"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Banner = () => {
  return (
    <section
      className="py-24 w-full relative overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ backgroundColor: "#c9a96e" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full opacity-10"
        style={{ backgroundColor: "#c9a96e" }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="content-container relative z-10">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            ✦ Penawaran Spesial ✦
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl small:text-5xl font-light tracking-wide leading-tight"
            style={{ color: "#f5f0eb" }}
          >
            Dapatkan{" "}
            <span style={{ color: "#c9a96e" }}>Diskon 20%</span>
            <br />
            Untuk Pembelian Pertama
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm leading-relaxed max-w-md font-light"
            style={{ color: "#a0a0a0" }}
          >
            Daftar sekarang dan nikmati diskon spesial untuk
            pembelian pertama Anda. Berlaku untuk semua produk
            koleksi Safiya Veil.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <LocalizedClientLink href="/account/register">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#c9a96e" }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 border"
                style={{
                  borderColor: "#c9a96e",
                  color: "#c9a96e",
                  backgroundColor: "transparent"
                }}
              >
                Daftar Sekarang
              </motion.button>
            </LocalizedClientLink>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Banner