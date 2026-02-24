"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { FiUser, FiMail, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get(
          "/customization-requests?populate=image,event_type,product_type",
        );
        setRequests(res.data.data);
        console.log("Customization requests:", res.data.data);
      } catch (err) {
        console.error("errer fetching requests :", err.response?.data || err);
      }
    };
    fetchRequests();
  }, []);

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
              {/* Header: Name & Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <FiUser size={20} />
                    <span>{req.attributes.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <FiMail size={18} />
                    <span>{req.attributes.email}</span>
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

              {/* Expanded content */}
              {isExpanded && (
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>
                    <strong>Phone:</strong> {req.attributes.phone}
                  </p>
                  <p>
                    <strong>Event:</strong>{" "}
                    {req.attributes.event_type?.data?.attributes?.name}
                  </p>
                  <p>
                    <strong>Product:</strong>{" "}
                    {req.attributes.product_type?.data?.attributes?.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {req.attributes.quantity}
                  </p>
                  <p>
                    <strong>Delivery Date:</strong>{" "}
                    {new Date(req.attributes.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.attributes.message}
                  </p>
                  {req.attributes.image?.data?.length > 0 && (
                    <img
                      src={`http://localhost:1337/api${req.attributes.image.data[0].attributes.url}`}
                      alt="Preview"
                      className="w-40 rounded shadow mt-2"
                    />
                  )}
                  <p>
                    <strong>Color:</strong> {req.attributes.color}
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
