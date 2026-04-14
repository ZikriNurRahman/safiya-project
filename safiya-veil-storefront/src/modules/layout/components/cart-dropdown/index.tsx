"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, itemRef.current])

  return (
    <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="text-sm tracking-wide hover:text-[#c9a96e] transition-colors duration-200"
            href="/cart"
            data-testid="nav-cart-link"
            style={{ color: "#1a1a1a" }}
          >
            {`Keranjang (${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 w-[420px] text-ui-fg-base"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8e0d5",
              borderTop: "2px solid #c9a96e",
            }}
            data-testid="nav-cart-dropdown"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-center border-b" style={{ borderColor: "#e8e0d5" }}>
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase" style={{ color: "#1a1a1a" }}>
                Keranjang Belanja
              </h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-6 no-scrollbar p-px py-4">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="grid grid-cols-[100px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images ?? []}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3
                                  className="text-sm font-light overflow-hidden text-ellipsis"
                                  style={{ color: "#1a1a1a" }}
                                >
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-xs mt-1"
                                  style={{ color: "#6b6b6b" }}
                                  data-testid="cart-item-quantity"
                                >
                                  Jumlah: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            Hapus
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 flex flex-col gap-y-4 border-t" style={{ borderColor: "#e8e0d5" }}>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: "#6b6b6b" }}>
                      Subtotal{" "}
                      <span className="text-xs">(belum termasuk pajak & ongkir)</span>
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "#1a1a1a" }}
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      className="w-full py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#f5f0eb",
                      }}
                      data-testid="go-to-cart-button"
                    >
                      Lihat Keranjang
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                <div
                  className="text-xs flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#e8e0d5", color: "#6b6b6b" }}
                >
                  0
                </div>
                <span className="text-sm" style={{ color: "#6b6b6b" }}>
                  Keranjang kamu masih kosong.
                </span>
                <LocalizedClientLink href="/store">
                  <button
                    className="mt-2 px-6 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-200 hover:opacity-70"
                    style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
                    onClick={close}
                  >
                    Belanja Sekarang
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown