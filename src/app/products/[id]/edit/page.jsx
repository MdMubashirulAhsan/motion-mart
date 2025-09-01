"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditProductPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    purchasePrice: "",
    mrp: "",
    description: "",
    quantity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Safe fetch helper
  const fetchJson = async (url, options) => {
    const res = await fetch(url, options);
    const text = await res.text();
    try {
      return { ok: res.ok, data: JSON.parse(text) };
    } catch {
      return { ok: res.ok, data: null };
    }
  };

  // Fetch product data safely
  useEffect(() => {
    async function fetchProduct() {
      const { ok, data } = await fetchJson(`/api/products/${id}`);
      if (!ok) {
        toast.error(data?.error || "Failed to fetch product");
        return;
      }
      setFormData({
        name: data.name,
        category: data.category,
        purchasePrice: data.purchasePrice,
        mrp: data.mrp,
        description: data.description,
        quantity: data.quantity,
      });
      setPreview(data.image || null);
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imgUrl = preview;
      if (imageFile) imgUrl = await uploadToCloudinary(imageFile);

      const { ok, data } = await fetchJson(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imgUrl }),
      });

      if (!ok) {
        toast.error(data?.error || "Failed to update product");
        return;
      }

      toast.success(data?.message || "Product updated successfully!");
      router.push("/products");
    } catch (err) {
      toast.error("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 py-5 bg-[var(--background)] text-[var(--text)] min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-md w-full mx-auto p-6 rounded-xl shadow-md border border-[var(--primary)] bg-[var(--background)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--primary)]">
          Edit Product
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-[var(--primary)]">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block mb-1 font-medium text-[var(--primary)]">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="mrp" className="block mb-1 font-medium text-[var(--primary)]">
              M.R.P.
            </label>
            <input
              id="mrp"
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="purchasePrice" className="block mb-1 font-medium text-[var(--primary)]">
              Purchase Price
            </label>
            <input
              id="purchasePrice"
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-[var(--primary)]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block mb-1 font-medium text-[var(--primary)]">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1 font-medium text-[var(--primary)]">
              Product Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full border border-[var(--primary)] p-3 rounded-md bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
            />
          </div>

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
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
