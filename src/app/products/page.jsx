// app/products/page.js
import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";

export default async function Page() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, { cache: "no-store" });
  const products = await res.json();

  return (
    <div className="min-h-screen bg-background text-text py-6 px-15">
      <Breadcrumb />

      <h1 className="text-3xl font-bold text-primary mb-6">Our Products</h1>

      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-primary rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, idx) => (
                <tr
                  key={item._id || idx}
                  className="border-t border-primary hover:bg-secondary hover:text-background transition-colors"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border border-primary"
                      />
                    )}
                  </td>
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td className="p-3 text-secondary font-medium">{item.category}</td>
                  <td className="p-3 font-semibold">${item.price}</td>
                  <td className="p-3 font-semibold">{item.quantity}</td>
                  <td className="p-3">
                    <Link
                      href={`/products/${item._id}`}
                      className="px-3 py-1 rounded-lg bg-accent text-background hover:bg-primary transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-secondary mt-10">
          No products available.
        </p>
      )}
    </div>
  );
}
