"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FilterBar({
  eventTypes,
  productTypes,
  selectedEventType,
  selectedProductType,
  onEventTypeChange,
  onProductTypeChange,
}) {
  return (
    <motion.div
      className="flex flex-wrap gap-4 mb-8 justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.select
        className="min-w-[180px] px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-200"
        value={selectedEventType || ""}
        onChange={(e) => onEventTypeChange(e.target.value || null)}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.03 }}
      >
        <option value="">🎉 All Event Types</option>
        {eventTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </motion.select>

      <motion.select
        className="min-w-[180px] px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-200"
        value={selectedProductType || ""}
        onChange={(e) => onProductTypeChange(e.target.value || null)}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.03 }}
      >
        <option value="">🛍️ All Product Types</option>
        {productTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </motion.select>
    </motion.div>
  );
}
