import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, children }) => {
  return (
    <div
      className="flex-1 small:py-12 min-h-screen"
      style={{ backgroundColor: "#f5f0eb" }}
      data-testid="account-page"
    >
      {/* Header */}
      <div
        className="w-full py-10 border-b text-center mb-8"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        <div className="content-container">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Safiya Veil
          </span>
          <h1
            className="text-3xl font-light tracking-wide mt-2"
            style={{ color: "#1a1a1a" }}
          >
            Akun Saya
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#e8e0d5" }} />
          </div>
        </div>
      </div>

      <div className="flex-1 content-container h-full max-w-5xl mx-auto">
        <div
          className="border"
          style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
        >
          <div className={`grid grid-cols-1 ${customer ? "small:grid-cols-[220px_1fr]" : ""}`}>
            {/* Sidebar */}
            {customer && (
              <div
                className="p-6 border-b small:border-b-0 small:border-r"
                style={{ borderColor: "#e8e0d5" }}
              >
                {/* Greeting */}
                <div className="mb-6 pb-4 border-b" style={{ borderColor: "#e8e0d5" }}>
                  <p className="text-xs tracking-wide" style={{ color: "#6b6b6b" }}>
                    Halo,
                  </p>
                  <p
                    className="text-base font-semibold mt-1"
                    style={{ color: "#1a1a1a" }}
                  >
                    {customer.first_name} {customer.last_name}
                  </p>
                </div>
                <AccountNav customer={customer} />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-6 small:p-8">{children}</div>
          </div>
        </div>

        {/* Help section */}
        <div
          className="flex flex-col small:flex-row items-end justify-between border-t py-8 mt-8 gap-8"
          style={{ borderColor: "#e8e0d5" }}
        >
          <div>
            <h3
              className="text-base font-semibold mb-2 tracking-wide"
              style={{ color: "#1a1a1a" }}
            >
              Butuh Bantuan?
            </h3>
            <p
              className="text-sm font-light"
              style={{ color: "#6b6b6b" }}
            >
              Hubungi kami jika ada pertanyaan seputar pesanan atau produk.
            </p>
          </div>
          <LocalizedClientLink
            href="/contact"
            className="text-xs tracking-[0.15em] uppercase border px-6 py-3 transition-all duration-200 hover:opacity-70"
            style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
          >
            Hubungi Kami
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout