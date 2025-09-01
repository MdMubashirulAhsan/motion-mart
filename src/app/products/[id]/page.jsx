// app/products/[id]/page.js
import Breadcrumb from "@/app/components/Breadcrumb";
import React from "react";

export default async function ProductDetails({ params }) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${params.id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-secondary">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text pt-10 px-15">
      <Breadcrumb />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-lg border border-primary max-h-[500px] object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary">{product.name}</h1>
          <p className="text-lg text-secondary font-medium">
            Category: {product.category}
          </p>
          <p className="text-xl font-semibold">
            Price: <span className="text-accent">${product.mrp}</span>
          </p>
          <p className="text-lg font-medium">
            Available Qty: {product.quantity}
          </p>

          <p className="leading-relaxed text-text opacity-80">
            {product.description || "No description available for this product."}
          </p>

          <button
            disabled
            className="px-6 py-3 bg-primary text-background rounded-xl shadow-md hover:bg-secondary hover:text-background transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
