"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-16"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      <div
        className="w-full max-w-md p-10 border"
        style={{ backgroundColor: "#ffffff", borderColor: "#e8e0d5" }}
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Safiya Veil
          </span>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-10" style={{ backgroundColor: "#e8e0d5" }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-px w-10" style={{ backgroundColor: "#e8e0d5" }} />
          </div>
        </div>

        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate