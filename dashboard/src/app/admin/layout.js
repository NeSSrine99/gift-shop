"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken } from "@/lib/auth";


export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = getAdminToken();
    if (!token) router.push("/admin/login");
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {children}
    </div>
  );
}
