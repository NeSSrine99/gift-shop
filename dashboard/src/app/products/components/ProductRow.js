export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td className="px-4 py-3">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "No Image"
        )}
      </td>
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3">{product?.event_type?.name || "-"}</td>
      <td className="px-4 py-3">{product?.product_type?.name || "-"}</td>
      <td className="px-4 py-3">{product.price}</td>
      <td className="px-4 py-3 hidden md:table-cell">
        {product.quantity || "-"}
      </td>
      <td className="px-4 py-3 space-x-2">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
