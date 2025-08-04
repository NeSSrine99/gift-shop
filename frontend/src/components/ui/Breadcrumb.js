// components/ui/Breadcrumb.js
"use client";

import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  return (
    <div
      className="relative bg-cover bg-center bg-secondary bg-no-repeat py-24 w-full"
      style={{
        backgroundImage: `url('/images/breadCrumb5.jpeg')`,
      }}
    >
      {/* ✅ overlay in background */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* ✅ Breadcrumb nav content in front */}
      <nav className="relative z-10  text-white flex items-center flex-wrap justify-center container py-10">
        {items.map((item, index) => (
          <span key={index} className="flex items-center space-x-1">
            {index !== 0 && <FaChevronRight className="mx-2 text-xs" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline flex items-center gap-1"
              >
                {index === 0 && <FaHome size={18} />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
