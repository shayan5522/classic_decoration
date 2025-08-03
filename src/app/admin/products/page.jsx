'use client';

import { useEffect, useState } from 'react';
import ProductTable from '@/components/admin/products/ProductTable';
import ProductForm from '@/components/admin/products/ProductForm';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Product
                </button>
            </div>

            <ProductTable products={products} onDelete={handleDelete} onEdit={handleEdit} />

            {showForm && (
                <ProductForm
                    initialData={editingProduct}
                    onClose={() => setShowForm(false)}
                    onSave={() => {
                        setShowForm(false);
                        fetchProducts();
                    }}
                />
            )}
        </div>
    );
}
