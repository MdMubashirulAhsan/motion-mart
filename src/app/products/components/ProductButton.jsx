"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function ProductButton({ id, onDelete }) {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      // Call your API route to delete the product
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Optional: callback to parent to refresh list
      if (onDelete) onDelete(id);

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      <div className="join">
        <Link
          href={`/products/${id}`}
          className="btn join-item bg-accent text-background hover:bg-primary transition"
        >
          Details
        </Link>

        {role === "admin" && (
          <>
            <Link
              href={`/products/${id}/edit`}
              className="btn join-item bg-accent text-background hover:bg-primary transition"
            >
              Update
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn join-item bg-accent text-background hover:bg-primary transition"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <DeleteModal handleDelete={handleDelete} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
