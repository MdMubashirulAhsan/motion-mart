"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { LogIn, LogOut, UserPlus } from "lucide-react"; // example icons

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button
        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (!session) {
    // User not logged in → show login/register
    return (
      <div className="flex gap-3">
        {/* Register */}
        <Link href="/register">
          <Button className="flex items-center gap-2 btn-outline">
            <UserPlus className="h-5 w-5" />
            {/* Text hidden on small screens */}
            <span className="hidden sm:inline">Register</span>
          </Button>
        </Link>

        {/* Login */}
        <Link href="/login">
          <Button className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </Link>
      </div>
    );
  }

  // User logged in → logout
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="h-5 w-5" />
      <span className="hidden sm:inline">Log Out</span>
    </Button>
  );
}
