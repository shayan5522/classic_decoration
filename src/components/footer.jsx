import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaSnapchatGhost,
    FaTiktok,
    FaYoutube,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#1a1a1a] via-[#2f2f2f] to-[#D4AF37] text-white px-8 py-16">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & Description */}
                <div>
                    <div className="flex items-center mb-5">
                        <Image src="/logo.png" alt="Logo" width={45} height={45} />
                        <span className="ml-3 text-xl font-bold text-[#D4AF37]">
                            Classic Decoration
                        </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        At Classic Decoration, we specialize in making your celebrations
                        unforgettable. From birthdays to weddings, festivals, and beyond, our
                        diverse range of decoration items brings joy and elegance to every occasion.
                    </p>
                    <div className="flex space-x-4 mt-5 text-[#D4AF37] text-2xl">
                        <FaFacebookF className="hover:text-white transition duration-300 cursor-pointer" />
                        <FaInstagram className="hover:text-white transition duration-300 cursor-pointer" />
                        <FaSnapchatGhost className="hover:text-white transition duration-300 cursor-pointer" />
                        <FaTiktok className="hover:text-white transition duration-300 cursor-pointer" />
                        <FaYoutube className="hover:text-white transition duration-300 cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                        {[
                            { name: "Home", href: "/" },
                            { name: "About Us", href: "/about" },
                            { name: "Contact Us", href: "/contact" },
                            { name: "FAQs", href: "/faqs" },
                            { name: "Order Tracking", href: "/order-tracking" },
                            { name: "Privacy Policy", href: "/privacy-policy" },
                            { name: "Terms and Conditions", href: "/terms" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-[#D4AF37] transition duration-300">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">Get In Touch</h4>
                    <p className="text-sm text-gray-300 mb-2">
                        Email:{" "}
                        <a
                            href="mailto:support@classicdecor.com"
                            className="text-[#D4AF37] hover:underline"
                        >
                            Support@ClassicDecoration.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-300">
                        Phone:{" "}
                        <a href="tel:+923169293909" className="text-[#D4AF37] hover:underline">
                            0316 9293909
                        </a>
                    </p>
                </div>

                {/* Location */}
                <div>
                    <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">Location</h4>
                    <div className="w-full h-40 overflow-hidden rounded-lg shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26429.448273624494!2d73.0158258!3d33.6282236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df950a241c6eeb%3A0x5e5d6e4c5c99f191!2sWaleed%20Party%20Decoration!5e0!3m2!1sen!2s!4v1661323579094!5m2!1sen!2s"
                            className="w-full h-full border-0 rounded-md"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </footer>
    );
}
