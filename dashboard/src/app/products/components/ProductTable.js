import ProductRow from "./ProductRow";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 hidden md:table-cell">Event Type</th>
            <th className="px-4 py-3 hidden md:table-cell">Product Type</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 hidden md:table-cell">Quantity</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
