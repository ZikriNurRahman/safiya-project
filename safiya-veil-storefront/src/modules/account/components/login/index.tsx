import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="login-page">
      <h1
        className="text-2xl font-light tracking-wide mb-2"
        style={{ color: "#1a1a1a" }}
      >
        Selamat Datang
      </h1>
      <p
        className="text-center text-xs font-light mb-8"
        style={{ color: "#6b6b6b" }}
      >
        Masuk ke akun Safiya Veil kamu.
      </p>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <button
          type="submit"
          className="w-full mt-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "#1a1a1a", color: "#f5f0eb" }}
          data-testid="sign-in-button"
        >
          Masuk
        </button>
      </form>

      <span
        className="text-center text-xs font-light mt-6"
        style={{ color: "#6b6b6b" }}
      >
        Belum punya akun?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline transition-colors duration-200"
          style={{ color: "#c9a96e" }}
          data-testid="register-button"
        >
          Daftar sekarang
        </button>
      </span>
    </div>
  )
}

export default Login