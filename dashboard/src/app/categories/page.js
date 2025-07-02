"use client";

import { useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Birthday" },
    { id: 2, name: "Wedding" },
    { id: 3, name: "Boxes" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const openAddModal = () => {
    setEditingId(null);
    setCategoryName("");
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, name: categoryName } : cat
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: prev.length + 1, name: categoryName },
      ]);
    }

    setShowModal(false);
    setCategoryName("");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#6b4c5b]">Categories</h1>
        <button
          onClick={openAddModal}
          className="bg-[#d9a5b3] text-white px-4 py-2 rounded hover:bg-[#c68a9f] text-sm transition"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="text-[#6b4c5b] font-medium">
                {category.name}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="text-[#6b4c5b] bg-[#fcebeb] px-3 py-1 rounded hover:bg-[#f8e0e0] text-xs transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-white bg-red-400 px-3 py-1 rounded hover:bg-red-500 text-xs transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#6b4c5b]">
              {editingId ? "Edit Category" : "Add New Category"}
            </h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#fcebeb] text-[#6b4c5b] px-4 py-2 rounded hover:bg-[#f8e0e0] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#d9a5b3] text-white px-4 py-2 rounded hover:bg-[#c68a9f] transition"
              >
                {editingId ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
