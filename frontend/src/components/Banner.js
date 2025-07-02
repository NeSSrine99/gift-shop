import React from "react";
import Button from "./ui/Button";
import Image from "next/image";

const Banner = () => {
  return (
    <main className="bg-bg py-20 lg:px-[120px] sm:px-9 px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
      {/* Text Section */}
      <section className="max-w-[519px] flex flex-col items-center lg:items-start justify-center gap-4 text-center lg:text-left">
        <div className="text-primary text-5xl font-bold font-playFair font-['Playfair']">
          Crafted for Your Special Moments
        </div>
        <div className="text-black text-lg font-medium">
          Delicate handcrafted favors for weddings, baby showers, graduations,
          and more.
        </div>
        <div className="flex items-center justify-center sm:gap-4 gap-2 mt-6 flex-wrap">
          <Button>Shop Now</Button>
          <Button variant="outline">Customize Your Gift</Button>
        </div>
      </section>

      {/* Image Section */}
      <section>
        <Image
          src="/images/banner.png"
          alt="Banner Image"
          width={500}
          height={390}
        />
      </section>
    </main>
  );
};

export default Banner;
