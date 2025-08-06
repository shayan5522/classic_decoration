import Image from 'next/image';
import { notFound } from 'next/navigation';

// Utility to convert slug to title case name
function slugToName(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CategoryPage({ params }) {
    const categorySlug = params?.categorySlug;

    if (!categorySlug) {
        console.error('❌ categorySlug is missing');
        return notFound();
    }

    const categoryName = slugToName(categorySlug);
    console.log('✅ Converted slug to name:', categoryName);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    let allCategories = [];
    try {
        const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
        allCategories = await res.json();
        console.log('✅ Categories fetched:', allCategories);
    } catch (err) {
        console.error('❌ Error fetching categories:', err);
        return notFound();
    }

    const matchedCategory = allCategories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!matchedCategory) {
        console.warn(`⚠️ No category matched for: ${categoryName}`);
        return notFound();
    }

    let products = [];
    try {
        const res = await fetch(
            `${baseUrl}/api/products?category=${encodeURIComponent(matchedCategory.name)}`,
            { cache: 'no-store' }
        );
        products = await res.json();
        console.log(`✅ Products fetched (${products.length}) for ${matchedCategory.name}`);
    } catch (err) {
        console.error('❌ Error fetching products:', err);
        return notFound();
    }

    return (
        <div className="px-6 md:px-16 py-12 bg-white min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-10">
                {matchedCategory.name} <span className="text-[#D4AF37]">Products</span>
            </h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
                        >
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
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                <p className="text-gray-600 font-medium">Rs. {product.price}</p>
                                <a
                                    href={`/products/${product.id}`}
                                    className="mt-2 inline-block bg-[#D4AF37] text-white font-semibold px-4 py-2 rounded hover:bg-[#b6982f] transition"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
