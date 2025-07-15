import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import PopularProducts from "@/components/PopularProduct";
import ProductCard from "@/components/ui/ProductCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Banner />
      {/* <ProductCard /> */}
      {/* <PopularProducts /> */}
      <Categories />
      <WhyChooseUs />
      <Gallery />
      <Contact />
    </main>
  );
}
