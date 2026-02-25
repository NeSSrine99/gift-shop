"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { FiUser, FiMail, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get(
        "/customization-requests?populate[0]=image&populate[1]=event_type&populate[2]=product_type",
      );

      console.log("Customization API response:", res.data);

      const formatted = res.data.data.map((item) => {
        const firstImage =
          item.image && Array.isArray(item.image) && item.image.length > 0
            ? item.image[0]
            : null;

        return {
          id: item.documentId || item.id,
          name: item.name || "No name",
          email: item.email || "",
          phone: item.phone || "",
          quantity: item.quantity || 0,
          date: item.date || null,
          message: item.message || "",
          color: item.color || "",

          event_type: item.event_type || null,
          product_type: item.product_type || null,

          image: firstImage
            ? firstImage.url.startsWith("http")
              ? firstImage.url
              : `http://localhost:1337${firstImage.url}`
            : "",
        };
      });

      setRequests(formatted);
    } catch (err) {
      console.error(
        "Error fetching requests:",
        err.response?.data || err.message,
      );
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        📋 Customization Orders
      </h1>

      <div className="space-y-4">
        {requests.map((req) => {
          const isExpanded = expandedIds.includes(req.id);

          return (
            <div
              key={req.id}
              className="border rounded-lg p-4 shadow hover:bg-gray-50 transition cursor-pointer"
              onClick={() => toggleExpand(req.id)}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <FiUser size={20} />
                    <span>{req.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-secondary">
                    <FiMail size={18} />
                    <span>{req.email}</span>
                  </div>
                </div>

                <div className="text-primary">
                  {isExpanded ? (
                    <FiChevronUp size={24} />
                  ) : (
                    <FiChevronDown size={24} />
                  )}
                </div>
              </div>

              {/* Expanded Section */}
              {isExpanded && (
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>
                    <strong>Phone:</strong> {req.phone}
                  </p>

                  <p>
                    <strong>Event:</strong> {req.event_type?.name || "—"}
                  </p>

                  <p>
                    <strong>Product:</strong> {req.product_type?.name || "—"}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {req.quantity}
                  </p>

                  <p>
                    <strong>Delivery Date:</strong>{" "}
                    {req.date ? new Date(req.date).toLocaleDateString() : "—"}
                  </p>

                  <p>
                    <strong>Message:</strong> {req.message}
                  </p>

                  {req.image && (
                    <img
                      src={req.image}
                      alt="Preview"
                      className="w-40 rounded shadow mt-2"
                    />
                  )}

                  <p>
                    <strong>Color:</strong> {req.color}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
