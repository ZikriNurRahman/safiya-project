import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Safiya Veil - Pure in Faith, Grace in Style",
  description: "Brand hijab premium untuk wanita muslimah modern.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="id" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}