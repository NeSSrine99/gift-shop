"use client";
import React from "react";

export default function FilterBar({
  eventTypes,
  productTypes,
  selectedEventType,
  selectedProductType,
  onEventTypeChange,
  onProductTypeChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        className="border p-2 rounded"
        value={selectedEventType || ""}
        onChange={(e) => onEventTypeChange(e.target.value || null)}
      >
        <option value="">All Event Types</option>
        {eventTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={selectedProductType || ""}
        onChange={(e) => onProductTypeChange(e.target.value || null)}
      >
        <option value="">All Product Types</option>
        {productTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
