import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";

// Load Poppins font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // add weights as needed
    variable: "--font-poppins",
});

// Existing fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Classic Decoration",
    description: "Decoration Website",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
