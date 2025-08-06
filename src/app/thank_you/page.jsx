export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
            <div className="bg-white rounded-xl shadow-md max-w-xl w-full p-8 text-center space-y-6">
                <div className="flex justify-center">
                    <svg
                        className="w-20 h-20 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Thank You for Your Order!
                </h1>
                <p className="text-gray-600">
                    We’ve received your order and will contact you shortly to confirm it.
                </p>
                <a
                    href="/"
                    className="inline-block bg-[#D4AF37] hover:bg-[#b6982f] text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}
