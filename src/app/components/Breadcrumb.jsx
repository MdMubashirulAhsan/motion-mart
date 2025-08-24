"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g., "/products/add"
  const segments = pathname.split("/").filter(Boolean); // ["products", "add"]

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-1">/</span>
        </li>

        {segments.map((segment, idx) => {
          const path = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={idx}>
              {isLast ? (
                <span className="font-semibold">{segment.replace(/-/g, " ")}</span>
              ) : (
                <>
                  <Link href={path} className="hover:text-blue-600">
                    {segment.replace(/-/g, " ")}
                  </Link>
                  <span className="mx-1">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
