'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // TODO: Connect with your backend or Formspree
    };

    return (
        <section className="py-16 px-4 bg-white text-gray-800">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Contact <span className="text-[#D4AF37]">Us</span>
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6"
                >
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-600 text-white font-semibold py-2 px-6 rounded hover:bg-yellow-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
