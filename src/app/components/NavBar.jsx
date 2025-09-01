"use client";

import Link from "next/link";
import useTheme from "../hooks/useTheme";
import AuthButton from "./AuthButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  // Replace with actual auth state (NextAuth, Context, etc.)
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="navbar px-3 md:px-7 lg:px-15 sticky top-0 left-0 w-full backdrop-blur-md bg-[var(--background)]/80 shadow-md z-50 ">
      {/* Left side */}
      <div className="navbar-start space-x-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className=" lg:hidden cursor-pointer">
            {/* Mobile menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[var(--background)] rounded-xl z-10 mt-3 w-52 p-3 shadow-md border border-[var(--primary)]/20"
          >
            <li>
              <Link
                href="/products"
                className={`transition-colors ${
                  pathname === "/products"
                    ? "text-[var(--primary)] font-semibold"
                    : "hover:text-[var(--primary)]"
                }`}
              >
                Products
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  href="/dashboard/add-product"
                  className={`transition-colors ${
                    pathname === "/dashboard"
                      ? "text-[var(--primary)] font-semibold"
                      : "hover:text-[var(--primary)]"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            
          </ul>
        </div>
        {/* Brand */}
        <Link href="/" className="block md:hidden">
          <Image
            src="/mm.png"
            alt="Brand Logo"
            width={100}
            height={100}
            className="w-[60] h-[60]"
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hidden md:block"
          style={{ color: "var(--primary)" }}
        >
          MOHAJON MART
        </Link>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link
              href="/products"
              className={`transition-colors ${
                pathname === "/products"
                  ? "text-[var(--primary)] font-semibold"
                  : "hover:text-[var(--primary)]"
              }`}
            >
              Products
            </Link>
          </li>
          {session && (
            <li>
              <Link
                href="/dashboard"
                className={`transition-colors ${
                  pathname === "/products"
                    ? "text-[var(--primary)] font-semibold"
                    : "hover:text-[var(--primary)]"
                }`}
              >
                Dashboard
              </Link>
            </li>

          )}
          
        </ul>
      </div>

      {/* Right side - Theme + Auth */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </label>

        {/* Auth Button */}
        <AuthButton />
      </div>
    </div>
  );
}
