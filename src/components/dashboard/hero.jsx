'use client';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <Image
                src="/assets/hero.jpg"
                alt="Classic decor hero"
                fill
                className="z-0 object-cover opacity-80"
                priority
            />

            {/* Overlay content */}
            <div className="z-10 text-center px-4 max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
                    Elevate Your Living Space
                </h1>
                <p className="text-lg md:text-xl mb-8 drop-shadow-sm">
                    Discover timeless decor pieces crafted to inspire elegance and warmth.
                </p>
                <button className="px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-600 transition">
                    Explore Collection
                </button>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-1" />
        </section>
    );
}
