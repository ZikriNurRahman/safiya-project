import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "id-ID", // ← Ganti ke id-ID untuk Indonesia
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        // Fix hydration mismatch dengan set nilai yang konsisten
        // IDR tidak pakai desimal, jadi set ke 0
        minimumFractionDigits: currency_code.toUpperCase() === "IDR" ? 0 : minimumFractionDigits ?? 0,
        maximumFractionDigits: currency_code.toUpperCase() === "IDR" ? 0 : maximumFractionDigits ?? 2,
      }).format(amount)
    : amount.toString()
}