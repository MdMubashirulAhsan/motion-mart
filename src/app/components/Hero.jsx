import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div>
      <div
        className="hero min-h-[80vh]  "
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-text text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-[var(--text)]">
              Hello{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-transparent bg-clip-text">
                there
              </span>
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-[var(--text)]/80">
              Discover a modern shopping experience with exclusive collections
              and quality products. Our goal is to make your buying journey
              seamless, stylish, and rewarding.
            </p>
            <Link href="/products">
              <button className="btn btn-primary">Get Started</button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
