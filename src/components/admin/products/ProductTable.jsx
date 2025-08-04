export default function ProductTable({ products, onDelete, onEdit }) {
    return (
        <table className="w-full text-sm border">
            <thead>
            <tr className="bg-gray-100 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Description</th> {/* New header */}
                <th className="p-2 border">Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, idx) => (
                <tr key={product.id}>
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">Rs {product.price}</td>
                    <td className="p-2 border">
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover"
                            />
                        )}
                    </td>
                    <td className="p-2 border">
                        {product.category?.name || 'Uncategorized'}
                    </td>
                    <td className="p-2 border max-w-xs truncate">
                        {product.description || 'N/A'} {/* Show description */}
                    </td>
                    <td className="p-2 border">
                        <button
                            onClick={() => onEdit(product)}
                            className="text-blue-500 hover:underline mr-3"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(product.id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
