'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categoryImages = {
    'Wedding items': '/assets/wedding.jpg',
    'Birthday items': '/assets/birthday.jpg',
    'Festival items': '/assets/festival.jpg',
    'Nikah Accessories': '/assets/nikah.jpg',
    'Gift Boxes': '/assets/gift_boxes.jpg',
    'Neon Boards': '/assets/neon_boards.jpg',
};

export default function ShopByCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();

                const enriched = data.map((cat) => {
                    const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
                    return {
                        ...cat,
                        image: categoryImages[cat.name] || '/assets/placeholder.jpg',
                        link: `/categories/${slug}`,
                    };
                });

                setCategories(enriched);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="text-center py-16">Loading categories...</div>;

    return (
        <section className="py-16 bg-white text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
                Shop By <span className="text-[#D4AF37]">Categories</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-20">
                {categories.map((cat, index) => (
                    <Link key={index} href={cat.link}>
                        <div className="relative overflow-hidden rounded-xl shadow-xl group hover:shadow-2xl transition-all duration-300">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                width={400}
                                height={300}
                                className="object-cover w-full h-64 transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 w-full text-center text-white text-xl font-semibold drop-shadow">
                                {cat.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
