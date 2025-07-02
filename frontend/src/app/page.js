import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Banner />
      <WhyChooseUs />
      <Gallery />
      <Contact />
    </main>
  );
}
