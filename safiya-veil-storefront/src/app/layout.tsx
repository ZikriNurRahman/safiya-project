import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Safiya Veil - Pure in Faith, Grace in Style",
  description: "Brand hijab premium untuk wanita muslimah modern.",
}

// Tentukan URL Snap.js berdasarkan environment
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
const IS_PRODUCTION = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
const SNAP_URL = IS_PRODUCTION
  ? "https://app.midtrans.com/snap/snap.js"
  : "https://app.sandbox.midtrans.com/snap/snap.js"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="id" data-mode="light">
      <body>
        {/* Midtrans Snap.js — dimuat setelah halaman interaktif */}
        <Script
          src={SNAP_URL}
          data-client-key={MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
        
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}