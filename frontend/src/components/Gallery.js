"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const Gallery = () => {
  return (
    <main className="bg-bg py-20 lg:px-[120px] sm:px-9 px-4">
      <section className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
        <p className="text-gray-600 text-lg">
          Discover the benefits of our personalized gifts and exceptional
          service.
        </p>
      </section>

      <section className="grid grid-flow-col grid-rows-3 gap-2 max-h-[400px] bg-white">
        <motion.section
          className="row-span-3 col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <Image
            src="/images/gallery1.png"
            alt="gallery 1"
            width={300}
            height={300}
            className="w-full h-full"
          />
        </motion.section>

        <motion.section
          className="col-span-1 row-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <Image
            src="/images/gallery2.png"
            alt="gallery 2"
            width={300}
            height={300}
            className="w-full h-full"
          />
        </motion.section>

        <motion.section
          className="col-span-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <Image
            src="/images/gallery3.jpeg"
            alt="gallery 3"
            width={300}
            height={40}
            className="w-full h-full"
          />
        </motion.section>
      </section>
    </main>
  );
};

export default Gallery;
