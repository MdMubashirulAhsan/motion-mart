"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registered successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      toast.error(data.error || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex gap-5 items-center justify-center min-h-screen px-15">
      <Toaster position="top-right" />
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
          Register
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            required
            className="p-2 rounded-lg border"
            style={{
              borderColor: "var(--secondary)",
              background: "var(--background)",
              color: "var(--text)",
            }}
          />
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
            disabled={loading}
            className="py-2 px-4 rounded-lg font-medium transition hover:opacity-90"
            style={{ background: "var(--accent)", color: "white" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
