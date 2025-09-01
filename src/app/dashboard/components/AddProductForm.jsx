"use client";

import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
// import Breadcrumb from "@/app/components/Breadcrumb";
// import Image from "next/image";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    purchasePrice: "",
    mrp: "",
    description: "",
    quantity: "",
    
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imgUrl = null;
      if (imageFile) imgUrl = await uploadToCloudinary(imageFile);

      const res = await fetch('/api/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imgUrl }),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        setFormData({ name: "", category: "", mrp: "", purchasePrice: "", description: "", quantity: "" });
        setImageFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const error = await res.json();
        toast.error("Error: " + error.error);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
      <div className="flex flex-col lg:flex-row gap-10  py-5 bg-[var(--background)] text-[var(--text)] min-h-screen">
       
        {/* Form Section */}

        <div className="max-w-md w-full  mx-auto p-6 rounded-xl shadow-md border border-[var(--primary)] bg-[var(--background)]">
          
          <Toaster position="top-right" />
          <h1 className="text-3xl font-bold mb-6 text-[var(--primary)]">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />

            <input
              type="number"
              name="mrp"
              placeholder="M.R.P."
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
            <input
              type="number"
              name="purchasePrice"
              placeholder="Purchase Price"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
            />

            {preview && (
              <div className="mt-2">
                <p className="text-sm mb-1 text-[var(--secondary)]">Image Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md border border-[var(--primary)]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-md bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--background)] font-semibold transition-colors"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-[var(--background)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        
        
      </div>
    </>
  );
}
