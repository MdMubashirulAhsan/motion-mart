"use client";

import { useState, useMemo } from "react";
import ProductButton from "./ProductButton";
import toast, { Toaster } from "react-hot-toast";

export default function ProductList({ initialProducts }) {
  const [items, setItems] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("all");
  const [layout, setLayout] = useState("table"); // "table" | "card"

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleDelete = (deletedId) => {
    setItems((prev) => prev.filter((p) => p._id !== deletedId));
    toast.success("Product removed from the list");

    // Adjust current page if needed
    const newTotalPages = Math.ceil((items.length - 1) / itemsPerPage);
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages || 1);
  };

  // Filtering + searching + sorting
  const filteredItems = useMemo(() => {
    let data = [...items];

    // Search
    if (searchQuery.trim() !== "") {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== "all") {
      data = data.filter((item) => item.category === filterCategory);
    }

    // Sort
    data.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [items, searchQuery, filterCategory, sortKey, sortOrder]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (filteredItems.length === 0) {
    return (
      <p className="text-center text-secondary mt-10">
        No products available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto py-4">
      <Toaster position="top-right" />

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-sm border border-primary rounded px-2"
        />

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-sm border border-primary"
        >
          <option value="all">All Categories</option>
          {[...new Set(items.map((i) => i.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="select select-sm border border-primary"
        >
          <option value="name">Name</option>
          <option value="purchasePrice">Purchase Price</option>
          <option value="mrp">M.R.P</option>
          <option value="quantity">Quantity</option>
        </select>
        <button
          className="btn btn-sm"
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        >
          {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>

        {/* Layout Toggle */}
        <button
          className="btn btn-sm"
          onClick={() => setLayout(layout === "table" ? "card" : "table")}
        >
          {layout === "table" ? "Card View" : "Table View"}
        </button>

        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="select select-sm border border-primary"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Layout rendering */}
      {layout === "table" ? (
        <table className="min-w-full border border-primary rounded-lg">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Purchase Price</th>
              <th className="p-3 text-left">M.R.P.</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr
                key={item._id || idx}
                className="border-t border-primary hover:bg-secondary hover:text-background transition-colors"
              >
                <td className="p-3">{startIndex + idx + 1}</td>
                <td className="p-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-primary"
                    />
                  )}
                </td>
                <td className="p-3 font-semibold">{item.name}</td>
                <td className="p-3 text-secondary font-medium">{item.category}</td>
                <td className="p-3 font-semibold">{item.purchasePrice}</td>
                <td className="p-3 font-semibold">{item.mrp}</td>
                <td className="p-3 font-semibold">{item.quantity}</td>
                <td className="p-3">
                  <ProductButton id={item._id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item, idx) => (
            <div
              key={item._id || idx}
              className="card border border-primary shadow-md p-3 flex flex-col gap-2"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md border border-primary"
                />
              )}
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-secondary">{item.category}</p>
              <p className="text-sm">Purchase: {item.purchasePrice}</p>
              <p className="text-sm">M.R.P: {item.mrp}</p>
              <p className="text-sm">Qty: {item.quantity}</p>
              <ProductButton id={item._id} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalFilteredPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalFilteredPages))}
          disabled={currentPage === totalFilteredPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
