'use client';
import Image from 'next/image';
import Link from "next/link";

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

                <Link
                    href="/#categories"
                    scroll={true}
                    className="inline-block bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#b6982f] transition duration-300"
                >
                    Explore Collection
                </Link>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-1" />
        </section>
    );
}
