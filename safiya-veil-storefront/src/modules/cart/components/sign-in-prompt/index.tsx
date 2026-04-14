import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div
      className="flex items-center justify-between p-5 border"
      style={{
        backgroundColor: "#faf8f5",
        borderColor: "#e8e0d5",
      }}
    >
      <div>
        <h2
          className="text-sm font-semibold tracking-wide"
          style={{ color: "#1a1a1a" }}
        >
          Sudah punya akun?
        </h2>
        <p
          className="text-xs font-light mt-1"
          style={{ color: "#6b6b6b" }}
        >
          Masuk untuk pengalaman belanja yang lebih mudah.
        </p>
      </div>
      <LocalizedClientLink href="/account">
        <button
          className="px-6 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-200 hover:opacity-70"
          style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
          data-testid="sign-in-button"
        >
          Masuk
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt