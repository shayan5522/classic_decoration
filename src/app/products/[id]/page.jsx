export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }) {
    const { id } = await Promise.resolve(params);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let product = null;

    try {
        const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) return notFound();

        const json = await res.json();
        product = Array.isArray(json) ? json[0] : json;

    } catch (err) {
        return notFound();
    }

    const hasImage = product?.image && product.image.trim() !== '';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 grid md:grid-cols-2 gap-10">
                <div className="relative w-full h-[400px] bg-gray-100 rounded-md overflow-hidden">
                    {hasImage ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-6 transition-opacity duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            <Image
                                src="/assets/placeholder.jpg"
                                alt="Placeholder"
                                width={400}
                                height={300}
                                className="w-full h-56 object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>
                        <p className="text-2xl text-[#D4AF37] font-semibold mb-4">
                            Rs. {product.price}
                        </p>
                        {product.description && (
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>

                    <a
                        href={`/order/${product.id}`}
                        className="w-full text-center bg-[#D4AF37] hover:bg-[#b6982f] text-white font-semibold py-3 rounded-lg transition"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}
