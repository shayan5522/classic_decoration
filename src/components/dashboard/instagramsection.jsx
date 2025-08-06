export default function InstagramSection() {
    return (
        <section className="bg-white py-16 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Reel 1 */}
                <div className="w-full max-w-sm mx-auto h-[550px]">
                    <iframe
                        src="https://www.instagram.com/p/DM61p0PiQYs/embed"
                        className="w-full h-full border rounded-lg"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Reel 2 */}
                <div className="w-full max-w-sm mx-auto h-[550px]">
                    <iframe
                        src="https://www.instagram.com/p/DM0CtdqyuTt/embed"
                        className="w-full h-full border rounded-lg"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Reel 3 */}
                <div className="w-full max-w-sm mx-auto h-[550px]">
                    <iframe
                        src="https://www.instagram.com/p/DMzzvDLs8C7/embed"
                        className="w-full h-full border rounded-lg"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

        </section>
    );
}
