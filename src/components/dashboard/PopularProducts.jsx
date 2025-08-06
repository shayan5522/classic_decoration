'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        // Sort by createdAt (newest first), or just slice if already sorted
        const latest8 = [...data]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8);

        setProducts(latest8);
      } catch (err) {
        console.error('❌ Error fetching products for homepage:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading popular products...</div>;

  return (
      <section className="bg-[#f9f9f9] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
            Popular <span className="text-[#e6bc37]">Products</span>
            <span className="block h-[2px] w-[80%] bg-[#e6bc37] mt-2 absolute left-1/2 transform -translate-x-1/2"></span>
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Explore our most loved decoration items — handpicked by our customers for unforgettable celebrations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative w-full h-56">
                    <Image
                        src={
                          product.image && product.image.trim() !== ''
                              ? product.image
                              : '/assets/placeholder.jpg'
                        }
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[#e6bc37] font-medium mb-2">Rs. {product.price}</p>
                    <Link
                        href={`/products/${product.id}`}
                        className="mt-2 inline-block text-sm px-4 py-2 border border-[#e6bc37] text-[#e6bc37] rounded-full hover:bg-[#e6bc37] hover:text-white transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}
