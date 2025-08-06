import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import FloatingWhatsapp from "@/components/FloatingWhatsapp";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

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
            className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
        >
        <LayoutWrapper>{children}</LayoutWrapper>
        <ToastContainer position="top-center" />
        <FloatingWhatsapp/>
        </body>
        </html>
    );
}
