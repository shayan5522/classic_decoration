import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getProduct(id) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/products/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error('❌ Error fetching product:', err);
        return null;
    }
}

export default async function ProductDetail({ params }) {
    const id = params.id;
    if (!id) return notFound();

    const product = await getProduct(id);
    if (!product) return notFound();

    const hasImage = product.image && product.image.trim() !== '';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 grid md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="relative w-full h-[400px] bg-gray-100 rounded-md overflow-hidden">
                    {hasImage ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-6 transition-opacity duration-300"
                        />
                    ) : (
                        <div className="w-full h-full animate-pulse flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                            <Image
                                src={
                                    product.image && product.image.trim() !== ''
                                        ? product.image
                                        : '/assets/placeholder.jpg'
                                }
                                alt={product.name}
                                width={400}
                                height={300}
                                className="w-full h-56 object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Product Info */}
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

                    <button className="w-full bg-[#D4AF37] hover:bg-[#b6982f] text-white font-semibold py-3 rounded-lg transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
