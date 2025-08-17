import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import PopularProducts from "@/components/PopularProduct";
import ShoppingCart from "@/components/shoppingCart";

import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <WhyChooseUs />
      <PopularProducts />
      <Gallery />
      <ShoppingCart />
      <Contact />
    </main>
  );
}
