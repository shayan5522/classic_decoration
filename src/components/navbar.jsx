"use client";
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href) => {
        // Exclude hash links like "/#categories" from active state
        if (href.startsWith("/#")) return false;
        return pathname === href;
    };

    const linkClasses = (href) =>
        `transition hover:underline ${
            isActive(href)
                ? "text-yellow-600 underline underline-offset-4 decoration-yellow-500"
                : "text-black"
        }`;

    return (
        <header className="bg-white border border-gray-200 shadow-lg rounded-md mt-4 mx-4 mb-6 z-50 relative">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={30} height={30} />
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex space-x-10 text-base font-bold">
                    <Link href="/" className={linkClasses("/")}>
                        Home
                    </Link>
                    <Link href="/products" className={linkClasses("/products")}>
                        All Products
                    </Link>
                    <Link
                        href="/#categories"
                        scroll={true}
                        className="text-black hover:underline"
                    >
                        Categories
                    </Link>
                    <Link href="/faqs" className={linkClasses("/faqs")}>
                        FAQs
                    </Link>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/contact"
                        className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold text-sm shadow-sm hover:bg-yellow-700 transition"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center bg-yellow-100 text-yellow-600 px-4 py-2 rounded font-semibold text-sm shadow-sm hover:bg-yellow-200 transition"
                    >
                        <FiPhoneCall className="mr-2" />
                        Whatsapp Us
                    </Link>
                </div>

                {/* Hamburger Icon for Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-gray-700"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg rounded-b-md px-4 py-4 space-y-4 absolute top-full left-0 right-0 z-40">
                    <nav className="flex flex-col space-y-3 text-base font-bold">
                        <Link href="/" onClick={() => setIsOpen(false)} className={linkClasses("/")}>
                            Home
                        </Link>
                        <Link href="/products" onClick={() => setIsOpen(false)} className={linkClasses("/products")}>
                            All Products
                        </Link>
                        <Link
                            href="/#categories"
                            scroll={true}
                            onClick={() => setIsOpen(false)}
                            className="text-black hover:underline"
                        >
                            Categories
                        </Link>
                        <Link href="/faqs" onClick={() => setIsOpen(false)} className={linkClasses("/faqs")}>
                            FAQs
                        </Link>
                    </nav>
                    <div className="flex flex-col space-y-3 pt-3">
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold text-sm shadow-sm hover:bg-yellow-700 transition"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center bg-yellow-100 text-yellow-600 px-4 py-2 rounded font-semibold text-sm shadow-sm hover:bg-yellow-200 transition"
                        >
                            <FiPhoneCall className="mr-2" />
                            Whatsapp Us
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
