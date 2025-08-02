// components/Categories.js
"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./ui/CategoryCard";
import axios from "axios";

const Categories = () => {
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const res = await axios.get("http://localhost:1337/api/event-types");
        setEventTypes(res.data.data);
      } catch (error) {
        console.error("❌ Failed to fetch event types:", error);
      }
    };

    fetchEventTypes();
  }, []);

  return (
    <section className="flex flex-col gap-10 py-20 lg:px-[120px] sm:px-9 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-3">Shop by Occasion</h2>
        <p className="text-gray-600 text-lg">
          Explore our wide range of gift categories.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {eventTypes.map((event) => (
          <CategoryCard
            key={event.id}
            id={event.id}
            name={event.name}
            image={`http://localhost:1337${
              event.image?.data?.url || "/placeholder.jpg"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
