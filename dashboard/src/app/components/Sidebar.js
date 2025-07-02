// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  List,
  Menu,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <Package size={20} />,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: <List size={20} />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-full bg-gray-100 border-r transition-all duration-300 ${
        isOpen ? "w-64" : "sm:w-20 w-16 p-3 "
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <div className="flex items-end text-primary gap-2">
            <Image src="/images/logo.svg" alt="Gift" width={40} height={40} />
            <h2 className="text-xl font-bold">Gift</h2>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-purple-600"
        >
          <Menu size={24} />
        </button>
      </div>

      <nav className="mt-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded transition-all"
          >
            <span>{link.icon}</span>
            {isOpen && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
