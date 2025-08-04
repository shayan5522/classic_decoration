'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ name: 'All' }]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('price');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories'),
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                console.log('🧾 Products fetched:', productsData);
                console.log('📂 Categories fetched:', categoriesData);

                const ids = productsData.map((p) => p.id);
                const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
                if (duplicates.length > 0) {
                    console.warn('⚠️ Duplicate product IDs found:', duplicates);
                }

                setProducts(productsData);
                setCategories([{ name: 'All' }, ...categoriesData]);
            } catch (err) {
                console.error('❌ Failed to fetch products or categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter(
                (p) =>
                    p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
            );

    const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    );

    if (loading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    return (
        <div className="px-6 md:px-16 py-12 bg-white min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-10">
                Our <span className="text-[#D4AF37]">Products</span>
            </h2>

            {/* Filter + Sort */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-4 py-2 rounded-full border ${
                                selectedCategory === cat.name
                                    ? 'bg-[#D4AF37] text-white'
                                    : 'bg-white border-gray-300 text-gray-700'
                            } hover:shadow-md transition`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="price">Sort by Price</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className="border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
                    >
                        <Image
                            src={
                                product.image && product.image.trim() !== ''
                                    ? product.image
                                    : '/assets/placeholder.jpg'
                            }
                            alt={product.name}
                            width={400}
                            height={300}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-bold text-gray-800">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 font-medium">Rs. {product.price}</p>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="mt-2 inline-block bg-[#D4AF37] text-white font-semibold px-4 py-2 rounded hover:bg-[#b6982f] transition"
                                >
                                    View Details

                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
