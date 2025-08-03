'use client';

import { useState } from 'react';
import Image from 'next/image';

const categories = ['All', 'Balloons', 'Backdrops', 'Lights', 'Table Decor', 'Props', 'Wall Decor'];

const products = [
    {
        title: 'Golden Balloon Set',
        price: 1500,
        image: '/assets/balloons.jpg',
    },
    {
        title: 'Birthday Backdrop',
        price: 3200,
        image: '/assets/backdrop.jpg',
    },
    {
        title: 'LED Fairy Lights',
        price: 850,
        image: '/assets/lights.jpg',
    },
    {
        title: 'Table Decor Kit',
        price: 1000,
        image: '/assets/table.jpg',
    },
    // Add more if needed
];

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('price');

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter((p) => p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        return sortBy === 'price' ? a.price - b.price : a.title.localeCompare(b.title);
    });

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
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border ${
                                selectedCategory === cat
                                    ? 'bg-[#D4AF37] text-white'
                                    : 'bg-white border-gray-300 text-gray-700'
                            } hover:shadow-md transition`}
                        >
                            {cat}
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
                        key={index}
                        className="border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={400}
                            height={300}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                            <p className="text-gray-600 font-medium">Rs. {product.price}</p>
                            <button className="mt-2 bg-[#D4AF37] text-white font-semibold px-4 py-2 rounded hover:bg-[#b6982f] transition">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
