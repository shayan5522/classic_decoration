"use client";
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";

export default function Navbar() {
    return (
        <header className="bg-white border border-gray-200 shadow-lg rounded-md mt-4 mx-4 mb-6">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={50} height={40} />
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex space-x-10 text-base font-bold text-black">
                    <Link href="/">Home</Link>
                    <Link href="#">Shop</Link>
                    <Link href="#">Categories</Link>
                    <Link href="#">FAQs</Link>
                </nav>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#"
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
            </div>
        </header>
    );
}
