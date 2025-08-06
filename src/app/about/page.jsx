import Image from 'next/image';
import Testimonials from "@/components/dashboard/testimonials";

export default function Page() {
    return (
        <section className="bg-white py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800">About <span className="text-[#D4AF37]">Classic Decoration</span></h2>
                    <p className="text-gray-600 mt-2">We can do more for you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left: Text */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Celebrating Every Moment with Style</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            At Classic Decoration, we believe in transforming every occasion into an unforgettable experience.
                            From birthday parties to weddings, we specialize in unique decoration items that add charm,
                            elegance, and color to your celebrations. Our commitment to quality and style sets us apart.
                            <br /><br />
                            With a dedicated team, diverse themes, and trending designs, we ensure your events shine.
                            Trusted by thousands of happy customers across Pakistan.
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                            <div>
                                <span className="text-2xl font-bold text-[#D4AF37]">30k+</span><br />Happy Customers
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-[#D4AF37]">100%</span><br />Client Satisfaction
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full rounded overflow-hidden shadow-md">
                        <Image
                            src="/assets/shop.jpg" // 🔁 Replace with your actual image path
                            alt="Classic Decoration Shop"
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Testimonials/>
            </div>
        </section>
    );
}
