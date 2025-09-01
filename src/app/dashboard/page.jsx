"use client";

import { useSession } from "next-auth/react";
import Breadcrumb from "../components/Breadcrumb";
import { User } from "lucide-react"; // optional icon
import Button from "../components/Button";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-lg font-medium text-gray-600">
          You are not logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-20 min-h-screen bg-base-200">
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-6 gap-6">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {session.user?.image ? (
                  <img src={session.user.image} alt="Profile" />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 bg-primary text-white rounded-full text-3xl">
                    <User />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
              <p className="text-gray-500">{session.user?.email}</p>
              {/* <div className="mt-4">
                <button className="btn btn-primary btn-sm rounded-full px-6">
                  Edit Profile
                </button>
              </div> */}
            </div>
          </div>

          {/* Extra info section */}
          <div className="border-t p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium">Account Status</p>
              <p>Active</p>
            </div>
            <div>
              <p className="font-medium">Member Since</p>
              <p>August 2025</p>
            </div>
          </div>
        </div>
        {role === "admin" && (
        <div className="mt-10 text-center">
          <Link href="/dashboard/add-product">
            <Button>Add Product</Button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}
