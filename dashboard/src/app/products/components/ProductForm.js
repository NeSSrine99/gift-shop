export default function ProductForm({
  show,
  onClose,
  onSave,
  product,
  setProduct,
  editingId,
  eventTypes = [],
  productTypes = [],
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md overflow-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4 text-[#6b4c5b]">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="space-y-3">
          {/* Product Name*/}
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          {/* Description*/}
          <textarea
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
            rows={4}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          {/*  Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setProduct({ ...product, image: imageUrl, file });
                }
              }}
              className="w-full border px-3 py-2 rounded"
            />
            {product.image && (
              <img
                src={product.image}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded"
              />
            )}
          </div>

          {/* Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={product.available || false}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
            />
            <span>Available</span>
          </label>

          {/* (event_type) */}
          <label className="block font-semibold mt-3">Event Type</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={product.event_type_id || ""}
            onChange={(e) =>
              setProduct({ ...product, event_type_id: e.target.value })
            }
          >
            <option value="">Select event type</option>
            {eventTypes.map((et) => (
              <option key={et.id} value={et.id}>
                {et.name}
              </option>
            ))}
          </select>

          {/*(product_type) */}
          <label className="block font-semibold mt-3">Product Type</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={product.product_type_id || ""}
            onChange={(e) =>
              setProduct({ ...product, product_type_id: e.target.value })
            }
          >
            <option value="">Select product type</option>
            {productTypes.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.attributes.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-[#fcebeb] text-[#6b4c5b] px-4 py-2 rounded hover:bg-[#f8e0e0] transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#c68a9f] transition"
          >
            {editingId ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
