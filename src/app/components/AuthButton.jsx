"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";

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
    // User not logged in → show login button
    return (
      <div className="flex gap-3">
        <Link href="/register">
          <Button className='btn-outline'>Register</Button>
        </Link>

        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  // User logged in → show logout button
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>Log Out</Button>
  );
}
