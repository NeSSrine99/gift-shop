"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function MessagesDropdown() {
  const [showMessages, setShowMessages] = useState(false);

  // بيانات الرسائل (مؤقتة، ممكن تستبدلها ببيانات من API)
  const messages = [
    { id: 1, sender: "Sarah", text: "New order placed!", time: "2m ago" },
    { id: 2, sender: "Omar", text: "Message about delivery", time: "10m ago" },
    { id: 3, sender: "Admin", text: "System update completed", time: "1h ago" },
  ];

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleMessages}
        className="relative p-2 rounded-full hover:bg-gray-100"
        aria-label="Toggle messages"
      >
        <MessageCircle size={24} className="text-[#6b4c5b]" />
        {messages.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
            {messages.length}
          </span>
        )}
      </button>

      {showMessages && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
          <h4 className="p-3 border-b font-semibold text-[#6b4c5b]">
            Messages
          </h4>
          <ul className="max-h-60 overflow-y-auto">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="px-4 py-3 hover:bg-purple-50 cursor-pointer"
              >
                <p className="text-sm font-medium text-[#6b4c5b]">
                  {msg.sender}
                </p>
                <p className="text-xs text-gray-600 truncate">{msg.text}</p>
                <p className="text-xs text-gray-400">{msg.time}</p>
              </li>
            ))}
            {messages.length === 0 && (
              <li className="p-4 text-center text-gray-500">No messages</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
