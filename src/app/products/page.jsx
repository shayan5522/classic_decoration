"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Sample product data
const sampleProducts = [
    { id: 1, name: "Golden Balloon Set", price: 1500, image: "/assets/balloon-arch.jpg", category: "Balloons" },
    { id: 2, name: "Birthday Backdrop", price: 3200, image: "/assets/balloon-arch.jpg", category: "Backdrops" },
    { id: 3, name: "LED Fairy Lights", price: 850, image: "/assets/balloon-arch.jpg", category: "Lights" },
    { id: 4, name: "Table Decor Kit", price: 1000, image: "/assets/balloon-arch.jpg", category: "Table Decor" },
    { id: 5, name: "Golden Curtains", price: 2400, image: "/assets/balloon-arch.jpg", category: "Backdrops" },
    { id: 6, name: "Confetti Balloons", price: 700, image: "/assets/balloon-arch.jpg", category: "Balloons" },
    { id: 7, name: "Decor Stand", price: 4000, image: "/assets/balloon-arch.jpg", category: "Props" },
    { id: 8, name: "Wall Flowers", price: 1800, image: "/assets/balloon-arch.jpg", category: "Wall Decor" },
];

export default function ProductsPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => setMounted(true), []);

    const categories = ["All", ...new Set(sampleProducts.map(p => p.category))];

    // Filter & Sort Logic
    const filteredProducts = sampleProducts
        .filter(p => selectedCategory === "All" || p.category === selectedCategory)
        .sort((a, b) => {
            if (sortOrder === "asc") return a.price - b.price;
            if (sortOrder === "desc") return b.price - a.price;
            return 0;
        });

    return (
        <div className="bg-white min-h-screen py-16 px-6 text-black">
            {/* Page Heading */}
            <h1 className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
                <span className="text-black">Our </span>
                <span className="text-[#D4AF37]">Products</span>
            </h1>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full border transition text-sm ${
                                selectedCategory === category
                                    ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Price Sort Filter */}
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                    <option value="default">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className={`bg-[#f9f9f9] rounded-xl p-4 shadow-md hover:shadow-xl transform transition duration-500 hover:scale-105 ${
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        } delay-${index * 75}`}
                    >
                        <div className="relative h-48 w-full rounded overflow-hidden mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-[#D4AF37] mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-700 mb-3">Rs. {product.price}</p>
                        <button className="bg-[#D4AF37] hover:bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded transition">
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination UI (non-functional placeholder) */}
            <div className="flex justify-center items-center mt-12 space-x-2 text-sm">
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">Previous</button>
                {[1, 2, 3].map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded-md border ${
                            page === 1 ? "bg-[#D4AF37] text-white border-[#D4AF37]" : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">Next</button>
            </div>
        </div>
    );
}
