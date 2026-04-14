"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"
import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({ customer }: { customer: HttpTypes.StoreCustomer | null }) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  // Nav links
  const navLinks = [
    { href: "/account/profile", label: "Profil", Icon: User, testId: "profile-link" },
    { href: "/account/addresses", label: "Alamat", Icon: MapPin, testId: "addresses-link" },
    { href: "/account/orders", label: "Pesanan", Icon: Package, testId: "orders-link" },
  ]

  return (
    <div>
      {/* Mobile Nav */}
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-sm py-2"
            style={{ color: "#6b6b6b" }}
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90" />
            <span>Akun</span>
          </LocalizedClientLink>
        ) : (
          <>
            <div
              className="text-xl font-light mb-4 px-8"
              style={{ color: "#1a1a1a" }}
            >
              Halo, {customer?.first_name}
            </div>
            <div className="text-sm">
              <ul>
                {navLinks.map(({ href, label, Icon, testId }) => (
                  <li key={href}>
                    <LocalizedClientLink
                      href={href}
                      className="flex items-center justify-between py-4 border-b px-8"
                      style={{ borderColor: "#e8e0d5" }}
                      data-testid={testId}
                    >
                      <div className="flex items-center gap-x-2" style={{ color: "#1a1a1a" }}>
                        <Icon size={20} />
                        <span>{label}</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </LocalizedClientLink>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b px-8 w-full"
                    style={{ borderColor: "#e8e0d5", color: "#1a1a1a" }}
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Keluar</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Desktop Nav */}
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4 border-b mb-4" style={{ borderColor: "#e8e0d5" }}>
            <h3
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#1a1a1a" }}
            >
              Akun Saya
            </h3>
          </div>
          <ul className="flex mb-0 justify-start items-start flex-col gap-y-3">
            <li>
              <AccountNavLink href="/account" route={route!} data-testid="overview-link">
                Ringkasan
              </AccountNavLink>
            </li>
            {navLinks.map(({ href, label, testId }) => (
              <li key={href}>
                <AccountNavLink href={href} route={route!} data-testid={testId}>
                  {label}
                </AccountNavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-light transition-colors duration-200 hover:opacity-70"
                style={{ color: "#6b6b6b" }}
                data-testid="logout-button"
              >
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({ href, route, children, "data-testid": dataTestId }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()
  const active = route.split(countryCode)[1] === href

  return (
    <LocalizedClientLink
      href={href}
      className={clx("text-sm font-light transition-colors duration-200", {
        "font-semibold": active,
      })}
      style={{ color: active ? "#1a1a1a" : "#6b6b6b" }}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav