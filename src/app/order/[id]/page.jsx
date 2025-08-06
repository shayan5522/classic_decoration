'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {toast} from "react-toastify";

export default function OrderPage() {
    const { id } = useParams(); // ✅ fixed: use useParams in client component
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        phone: '',
        proofImage: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                const res = await fetch(`${baseUrl}/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        if (id) fetchProduct();
    }, [id]);
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;

        const formData = new FormData();
        formData.append('customerName', form.customerName);
        formData.append('customerEmail', form.customerEmail);
        formData.append('phone', form.phone);
        formData.append('productId', product.id);
        formData.append('advanceAmount', (product.price * 0.05).toFixed(2));
        formData.append('proofImage', form.proofImage);

        setLoading(true);
        const res = await fetch('/api/orders', {
            method: 'POST',
            body: formData,
        });

        setLoading(false);
        if (res.ok) {
            toast.success('🎉 Order placed successfully!');
            router.push('/thank_you');
        } else {
            toast.error('❌ Failed to place order. Please try again.');
        }
    };

    if (!product) {
        return <div className="p-10 text-center">Loading product...</div>;
    }

    const advanceAmount = (product.price * 0.05).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-10">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Complete Your Order
                </h1>

                {/* Product Summary */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-40 h-40 rounded-md overflow-hidden border">
                        <Image
                            src={product.image || '/assets/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">Price: Rs. {product.price}</p>
                        <p className="text-yellow-600 font-semibold">
                            Advance (25%): Rs. {advanceAmount}
                        </p>
                    </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                name="customerName"
                                required
                                value={form.customerName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="customerEmail"
                                required
                                value={form.customerEmail}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Upload Payment Screenshot
                            </label>
                            <input
                                type="file"
                                name="proofImage"
                                accept="image/*"
                                required
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D4AF37] hover:bg-[#b6972f] text-white font-bold py-3 rounded-lg transition"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}
