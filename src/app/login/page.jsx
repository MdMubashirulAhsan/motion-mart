"use client"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const handleCredLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/products",
    })
  }

  return (
    <div className="flex gap-5 items-center justify-center min-h-screen">
      <div className="hidden lg:block">
        <img src='/login.jpg' alt="" className="w-120 rounded-3xl" />
      </div>
      <div
        className="p-8 rounded-2xl shadow-lg w-full max-w-md"
        style={{
          background: "var(--background)",
          color: "var(--text)",
          border: "1px solid var(--primary)",
        }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "var(--primary)" }}>
          Login
        </h1>

        {/* Google Login */}
        {/* <button
          className="w-full py-2 px-4 rounded-lg mb-4 font-medium transition"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
          onClick={() => signIn("google", { callbackUrl: "/products" })}
        >
          Sign in with Google
        </button> */}

        {/* Divider */}
        {/* <div className="flex items-center my-4">
          <div className="flex-1 h-px" style={{ background: "var(--secondary)" }}></div>
          <span className="px-2 text-sm">OR</span>
          <div className="flex-1 h-px" style={{ background: "var(--secondary)" }}></div>
        </div> */}

        {/* Credentials Login */}
        <form onSubmit={handleCredLogin} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2 rounded-lg border"
            style={{
              borderColor: "var(--secondary)",
              background: "var(--background)",
              color: "var(--text)",
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2 rounded-lg border"
            style={{
              borderColor: "var(--secondary)",
              background: "var(--background)",
              color: "var(--text)",
            }}
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-lg font-medium transition"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            Sign in with Credentials
          </button>
        </form>
      </div>
    </div>
  )
}
