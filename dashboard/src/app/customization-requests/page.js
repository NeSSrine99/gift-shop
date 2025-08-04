"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/customization-requests?populate[0]=image&populate[1]=event_type&populate[2]=product_type"
        );

        setRequests(res.data.data);
      } catch (err) {
        console.error("خطأ في تحميل الطلبات:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        📋 Customization Orders
      </h1>

      <div className="space-y-6">
        {requests.map((req) => {
          return (
            <div
              key={req.id}
              className="border rounded-lg p-4 shadow hover:bg-gray-50 transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <p>
                    <strong>👤 Name:</strong> {req.name}
                  </p>
                  <p>
                    <strong>📧 Email:</strong> {req.email}
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> {req.phone}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>🎉 Event:</strong> {req.event_type?.name}
                  </p>
                  <p>
                    <strong>🎁 Product:</strong> {req.product_type?.name}
                  </p>
                  <p>
                    <strong>📦 Quantity:</strong> {req.quantity}
                  </p>
                  <p>
                    <strong>📅 Delivery:</strong>{" "}
                    {new Date(req.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>📝 Message:</strong> {req.message}
                  </p>
                  {req.image && req.image.length > 0 && (
                    <img
                      src={`http://localhost:1337${req.image[0].url}`}
                      alt="Preview"
                      className="w-32 rounded shadow mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
