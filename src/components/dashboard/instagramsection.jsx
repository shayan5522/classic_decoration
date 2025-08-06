export default function InstagramSection() {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
                    Follow Us <span className="text-[#e6bc37]">On Instagram</span>
                    <span className="block h-[2px] w-[80%] bg-[#e6bc37] mt-2 absolute left-1/2 transform -translate-x-1/2"></span>
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Follow us on Instagram to stay updated with our latest trends, creations, and inspirations.
                    Join our amazing community and be part of the journey!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Reel 1 */}
                    <div className="aspect-[9/16] w-full max-w-sm mx-auto">
                        <iframe
                            src="https://www.instagram.com/p/DM61p0PiQYs/embed"
                            className="w-full h-full border rounded-lg"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Reel 2 */}
                    <div className="aspect-[9/16] w-full max-w-sm mx-auto">
                        <iframe
                            src="https://www.instagram.com/p/DM0CtdqyuTt/embed"
                            className="w-full h-full border rounded-lg"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Reel 3 */}
                    <div className="aspect-[9/16] w-full max-w-sm mx-auto">
                        <iframe
                            src="https://www.instagram.com/p/DMzzvDLs8C7/embed"
                            className="w-full h-full border rounded-lg"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
