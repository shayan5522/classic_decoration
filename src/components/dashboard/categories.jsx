'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
    {
        title: 'Wedding items',
        image: '/assets/wedding.jpg',
        link: '/categories/wedding',
    },
    {
        title: 'Birthday items',
        image: '/assets/birthday.jpg',
        link: '/categories/birthday',
    },
    {
        title: 'Festival items',
        image: '/assets/festival.jpg',
        link: '/categories/festival',
    },
    {
        title: 'Nikah Accessories',
        image: '/assets/nikah.jpg',
        link: '/categories/nikah-accessories',
    },
    {
        title: 'Gift Boxes',
        image: '/assets/gift_boxes.jpg',
        link: '/categories/gift-boxes',
    },
    {
        title: 'Neon Boards',
        image: '/assets/neon_boards.jpg',
        link: '/categories/neon-boards',
    },
];

export default function ShopByCategories() {
    return (
        <section className="py-16 bg-white text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 relative inline-block">
                Shop By <span className="text-[#D4AF37]">Categories</span>
                <div className="absolute left-0 right-0 h-1 bg-[#D4AF37] w-3/4 mx-auto top-full mt-2 rounded-full" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-20">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.link}
                        className="relative overflow-hidden rounded-xl shadow-xl group transition-all duration-300 hover:shadow-2xl"
                    >
                        <Image
                            src={cat.image}
                            alt={cat.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-64 transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute bottom-6 w-full text-center px-4">
                            <p className="text-white text-xl font-semibold drop-shadow">
                                {cat.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
