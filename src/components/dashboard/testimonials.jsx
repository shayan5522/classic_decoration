'use client';

import { useEffect, useState } from 'react';

const testimonials = [
    {
        name: 'Hira Shahid',
        date: '2024-12-12',
        rating: 5,
        message: 'Everything is good. Quality of acrylic box is perfect.',
    },
    {
        name: 'Palwasha Khan',
        date: '2024-12-12',
        rating: 5,
        message: 'High quality stuff in wholesale prices. Quick delivery. Highly recommended.',
    },
    {
        name: 'Aleesha Zahra',
        date: '2024-12-09',
        rating: 5,
        message: 'Order without hesitation. Best decoration provider in town.',
    },
    {
        name: 'Zainab Fatima',
        date: '2024-12-10',
        rating: 4,
        message: 'Loved the setup and quick service. Would buy again.',
    },
    {
        name: 'Areeba Malik',
        date: '2024-12-11',
        rating: 5,
        message: 'Neon boards were bright and eye-catching. Excellent quality!',
    },
    {
        name: 'Maham Javed',
        date: '2024-12-10',
        rating: 4,
        message: 'Received my gift boxes on time. Packaging was safe.',
    },
    {
        name: 'Laiba Ahmed',
        date: '2024-12-08',
        rating: 5,
        message: 'Nikah accessories were so elegant and classy. Highly satisfied.',
    },
    {
        name: 'Hafsa Raza',
        date: '2024-12-07',
        rating: 5,
        message: 'Great variety and affordable pricing. Highly recommended.',
    },
];

const avatarColors = [
    'bg-red-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-rose-500',
];

const getInitial = (name) => name.charAt(0).toUpperCase();

export default function Testimonials() {
    const [startIndex, setStartIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => {
                if (forward) {
                    if (prev + 4 >= testimonials.length) {
                        setForward(false);
                        return prev - 1;
                    }
                    return prev + 1;
                } else {
                    if (prev <= 0) {
                        setForward(true);
                        return prev + 1;
                    }
                    return prev - 1;
                }
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [forward]);

    const visibleTestimonials = testimonials.slice(startIndex, startIndex + 4);

    return (
        <section className="py-16 bg-gradient-to-br from-white via-[#fdf7e7] to-white">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900">
                    <span className="text-black">Test</span>
                    <span className="text-[#D4AF37]">imonials</span>
                </h2>
                <div className="h-1 w-28 mx-auto mt-2 bg-[#D4AF37] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-20 transition-all duration-700 ease-in-out">
                {visibleTestimonials.map((t, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-2xl shadow-xl border border-[#f1e7c6] hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl animate-fade-in"
                    >
                        <div className="flex items-center mb-4">
                            <div
                                className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold mr-3 shadow-md ${
                                    avatarColors[i % avatarColors.length]
                                }`}
                            >
                                {getInitial(t.name)}
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-gray-800">{t.name}</p>
                                <p className="text-sm text-gray-500">{t.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center text-yellow-500 text-sm mb-2">
                            {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                        </div>

                        <p className="text-gray-700 text-sm line-clamp-4 leading-relaxed italic">
                            “{t.message}”
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
