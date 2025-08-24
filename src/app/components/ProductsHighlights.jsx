// app/components/ProductsHighlights.js
"use client"
import Link from "next/link"

export default function ProductsHighlights() {
    const fakeProducts = [
  {
    "_id": "1",
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 99,
    "quantity": 50,
    "img": "https://images.unsplash.com/photo-1580894894517-7f53f56c6b6f?auto=format&fit=crop&w=400&q=80",
    "description": "High-quality wireless headphones with noise cancellation."
  },
  {
    "_id": "2",
    "name": "Smart Watch",
    "category": "Wearables",
    "price": 149,
    "quantity": 35,
    "img": "https://images.unsplash.com/photo-1523473827530-2cdbf9a4f2e8?auto=format&fit=crop&w=400&q=80",
    "description": "Track your health, fitness, and notifications on the go."
  },
  {
    "_id": "3",
    "name": "Gaming Mouse",
    "category": "Computer Accessories",
    "price": 49,
    "quantity": 80,
    "img": "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400&q=80",
    "description": "Precision gaming mouse with customizable RGB lighting."
  },
  {
    "_id": "4",
    "name": "Bluetooth Speaker",
    "category": "Audio",
    "price": 79,
    "quantity": 60,
    "img": "https://images.unsplash.com/photo-1585433562696-2f4b0f7d593b?auto=format&fit=crop&w=400&q=80",
    "description": "Portable Bluetooth speaker with crystal-clear sound."
  }
]

  return (
    <section className="py-16 bg-[var(--background)] text-[var(--text)] ">
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Our <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-transparent bg-clip-text">Highlights</span>
        </h2>
        <p className="text-lg mb-12 text-[var(--text)]/80 text-center">
          Explore our top products, carefully selected for quality, style, and affordability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {fakeProducts.map((item, idx) => (
            <div
              key={item._id || idx}
              className="flex flex-col items-center bg-[var(--background)] border border-[var(--primary)] rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition-transform"
            >
              {item.img && (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
              <p className="text-[var(--secondary)] mb-2">{item.category}</p>
              <p className="font-bold text-[var(--accent)] mb-4">${item.price}</p>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
