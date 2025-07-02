"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "🎁 Gift Shop",
    primaryColor: "#d9a5b3",
    email: "admin@giftshop.com",
    phone: "+216 123 456 789",
    enableOrders: true,
    enableNotifications: false,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة حفظ الإعدادات في Strapi أو في localStorage لاحقًا
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-[#6b4c5b]">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-[#6b4c5b]">
            Store Name
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#6b4c5b]">
            Primary Color
          </label>
          <input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="w-20 h-10 p-0 border rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#6b4c5b]">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#6b4c5b]">Phone</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="enableOrders"
            checked={settings.enableOrders}
            onChange={(e) => handleChange("enableOrders", e.target.checked)}
            className="cursor-pointer"
          />
          <label
            htmlFor="enableOrders"
            className="text-[#6b4c5b] cursor-pointer"
          >
            Enable Orders
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="enableNotifications"
            checked={settings.enableNotifications}
            onChange={(e) =>
              handleChange("enableNotifications", e.target.checked)
            }
            className="cursor-pointer"
          />
          <label
            htmlFor="enableNotifications"
            className="text-[#6b4c5b] cursor-pointer"
          >
            Enable Notifications
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#d9a5b3] text-white px-6 py-2 rounded hover:bg-[#c68a9f] transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
