import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ChevronDown from "@modules/common/icons/chevron-down"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        {/* Stats */}
        <div className="flex items-start gap-x-12 mb-8 pb-8 border-b" style={{ borderColor: "#e8e0d5" }}>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#6b6b6b" }}>
              Kelengkapan Profil
            </h3>
            <div className="flex items-end gap-x-2">
              <span
                className="text-3xl font-light"
                style={{ color: "#c9a96e" }}
                data-testid="customer-profile-completion"
              >
                {getProfileCompletion(customer)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#6b6b6b" }}>
              Alamat Tersimpan
            </h3>
            <div className="flex items-end gap-x-2">
              <span
                className="text-3xl font-light"
                style={{ color: "#1a1a1a" }}
                data-testid="addresses-count"
              >
                {customer?.addresses?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#1a1a1a" }}>
              Pesanan Terbaru
            </h3>
            <LocalizedClientLink
              href="/account/orders"
              className="text-xs tracking-wide underline transition-colors duration-200"
              style={{ color: "#c9a96e" }}
            >
              Lihat Semua
            </LocalizedClientLink>
          </div>

          <ul className="flex flex-col gap-y-4" data-testid="orders-wrapper">
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <li
                  key={order.id}
                  data-testid="order-wrapper"
                  data-value={order.id}
                >
                  <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                    <div
                      className="flex justify-between items-center p-4 border transition-all duration-200 hover:border-[#c9a96e]"
                      style={{
                        backgroundColor: "#faf8f5",
                        borderColor: "#e8e0d5",
                      }}
                    >
                      <div className="grid grid-cols-3 text-xs gap-x-6 flex-1">
                        <div className="flex flex-col gap-y-1">
                          <span className="font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
                            Tanggal
                          </span>
                          <span style={{ color: "#6b6b6b" }} data-testid="order-created-date">
                            {new Date(order.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
                            No. Pesanan
                          </span>
                          <span style={{ color: "#6b6b6b" }} data-testid="order-id">
                            #{order.display_id}
                          </span>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
                            Total
                          </span>
                          <span style={{ color: "#6b6b6b" }} data-testid="order-amount">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className="-rotate-90" style={{ color: "#6b6b6b" }} />
                    </div>
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <div
                className="p-8 text-center border"
                style={{ backgroundColor: "#faf8f5", borderColor: "#e8e0d5" }}
              >
                <p className="text-sm font-light" style={{ color: "#6b6b6b" }} data-testid="no-orders-message">
                  Kamu belum memiliki pesanan.
                </p>
                <LocalizedClientLink href="/store">
                  <button
                    className="mt-4 px-6 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-200 hover:opacity-70"
                    style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
                  >
                    Mulai Belanja
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0
  if (!customer) return 0
  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++
  const billingAddress = customer.addresses?.find((addr) => addr.is_default_billing)
  if (billingAddress) count++
  return (count / 4) * 100
}

export default Overview