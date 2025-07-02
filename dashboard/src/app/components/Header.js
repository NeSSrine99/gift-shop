"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import MessagesDropdown from "./UI/MessagesDropdown";
import { useNotifications } from "./UI/Notifications";

export default function Header() {
  const { notifications, addNotification } = useNotifications();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sm:px-6 px-2 py-4 flex items-center justify-between">
      {/* Admin Info */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/nesrin1.png"
          alt="Admin"
          width={38}
          height={38}
          className="rounded-full object-cover"
        />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-700">Admin User</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative hover:text-purple-600 transition p-1 rounded"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow z-50">
              <div className="p-3 text-sm font-semibold border-b text-gray-700">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <li
                      key={note.id}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <p className="font-medium">{note.title}</p>
                      <p className="text-xs text-gray-500">{note.message}</p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-400 text-sm text-center">
                    No notifications
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <MessagesDropdown />
      </div>
    </header>
  );
}
