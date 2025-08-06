'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsapp() {
    return (
        <a
            href="https://wa.me/923169293909"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
        >
            <FaWhatsapp className="text-2xl" />
        </a>
    );
}
