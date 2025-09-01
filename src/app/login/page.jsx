"use client";

import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleCredLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false, // important to handle errors
      email,
      password,
      callbackUrl: "/products",
    });

    if (result?.error) {
      toast.error("Invalid email or password");
    } else if (result?.ok) {
      toast.success("Logged in successfully!");
      router.push(result.url || "/products");
    }
  };

  return (
    <div className="flex gap-5 items-center justify-center min-h-screen px-15">
      <Toaster position="top-right" />
      <div className="hidden lg:block">
        <img src="/login.jpg" alt="" className="w-120 rounded-3xl" />
      </div>
      <div
        className="p-8 rounded-2xl shadow-lg w-full max-w-md"
        style={{
          background: "var(--background)",
          color: "var(--text)",
          border: "1px solid var(--primary)",
        }}
      >
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "var(--primary)" }}
        >
          Login
        </h1>

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
            className="py-2 px-4 rounded-lg font-medium transition hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            Login 
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
