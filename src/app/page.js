
import Hero from "@/components/dashboard/hero";
import ShopByCategories from "@/components/dashboard/categories";
import Testimonials from "@/components/dashboard/testimonials";
import InstagramSection from "@/components/dashboard/instagramsection";
import PopularProducts from "@/components/dashboard/PopularProducts";


export default function Home() {
    return (
        <>
            <Hero />
            <ShopByCategories />
            <PopularProducts />
            <InstagramSection />
            <Testimonials />
        </>
    );
}
