"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1
        className="text-2xl font-light tracking-wide mb-2"
        style={{ color: "#1a1a1a" }}
      >
        Buat Akun
      </h1>
      <p
        className="text-center text-xs font-light mb-8"
        style={{ color: "#6b6b6b" }}
      >
        Daftar dan nikmati pengalaman belanja yang lebih mudah.
      </p>

      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Nama Depan"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Nama Belakang"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Nomor Telepon"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="register-error" />

        <span
          className="text-center text-xs font-light mt-6"
          style={{ color: "#6b6b6b" }}
        >
          Dengan mendaftar, kamu menyetujui{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
            style={{ color: "#c9a96e" }}
          >
            Kebijakan Privasi
          </LocalizedClientLink>{" "}
          dan{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
            style={{ color: "#c9a96e" }}
          >
            Syarat & Ketentuan
          </LocalizedClientLink>{" "}
          kami.
        </span>

        <button
          type="submit"
          className="w-full mt-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
          data-testid="register-button"
        >
          Daftar
        </button>
      </form>

      <span
        className="text-center text-xs font-light mt-6"
        style={{ color: "#6b6b6b" }}
      >
        Sudah punya akun?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
          style={{ color: "#c9a96e" }}
        >
          Masuk
        </button>
      </span>
    </div>
  )
}

export default Register