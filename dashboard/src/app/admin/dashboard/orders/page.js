"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "Sarah Ali",
      items: [
        { name: "Mini Gift Box", quantity: 2 },
        { name: "Birthday Surprise", quantity: 1 },
      ],
      total: "$26.98",
      date: "2025-06-29",
      status: "Pending",
    },
    {
      id: 1002,
      customer: "Omar Ben Salah",
      items: [{ name: "Wedding Favor", quantity: 3 }],
      total: "$13.50",
      date: "2025-06-28",
      status: "Shipped",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#6b4c5b] mb-6">Orders</h1>

      {/* Scrollable wrapper */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              {/* إخفاء عمود Items في الشاشات الصغيرة */}
              <th className="px-4 py-3 hidden md:table-cell">Items</th>
              <th className="px-4 py-3">Total</th>
              {/* إخفاء عمود Date في الشاشات الصغيرة */}
              <th className="px-4 py-3 hidden md:table-cell">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  #{order.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {order.customer}
                </td>
                <td className="px-4 py-3 hidden md:table-cell max-w-xs">
                  {order.items.map((item) => (
                    <div key={item.name} className="truncate">
                      {item.name} ({item.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{order.total}</td>
                <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">
                  {order.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-[#6b4c5b] bg-[#fcebeb] rounded px-2 py-1 text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
