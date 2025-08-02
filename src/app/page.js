import Navbar from "@/components/navbar";
import Hero from "@/components/dashboard/hero";
import ShopByCategories from "@/components/dashboard/categories";
import Testimonials from "@/components/dashboard/testimonials";


export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ShopByCategories />
            <Testimonials />
        </>
    );
}
