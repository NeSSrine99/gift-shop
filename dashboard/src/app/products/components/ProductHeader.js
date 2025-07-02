export default function ProductHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-[#6b4c5b]">Products</h1>
      <button
        onClick={onAdd}
        className="bg-[#d9a5b3] text-white px-4 py-2 rounded hover:bg-[#c68a9f] text-sm transition"
      >
        + Add Product
      </button>
    </div>
  );
}
