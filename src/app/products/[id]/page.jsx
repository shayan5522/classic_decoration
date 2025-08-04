import {notFound} from 'next/navigation';

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

export default async function ProductDetail({params}) {
    // ✅ This is safe
    const id = params.id;

    if (!id) return notFound();

    const product = await getProduct(id);
    if (!product) return notFound();

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">Rs. {product.price}</p>
        </div>
    );
}
