// components/ui/Breadcrumb.js
"use client";

import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  return (
    <div
      className="bg-cover bg-center bg-primary bg-no-repeat py-20 w-full "
      style={{
        backgroundImage: `url('/images/breadcrumb-bg.jpg')`,
      }}
    >
      <nav className="text-sm text-white flex items-center flex-wrap justify-center container ">
        {items.map((item, index) => (
          <span key={index} className="flex items-center space-x-1">
            {index !== 0 && <FaChevronRight className="mx-2 text-xs" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline flex items-center gap-1"
              >
                {index === 0 && <FaHome />}
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
