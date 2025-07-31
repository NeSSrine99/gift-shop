"use client";

import React from "react";
import Button from "./ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const imageVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.9 } },
};

const Banner = () => {
  return (
    <main className="bg-bg py-20 lg:px-[120px] sm:px-9 px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
      {/* Text Section */}
      <motion.section
        className="max-w-[519px] flex flex-col items-center lg:items-start justify-center gap-4 text-center lg:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <motion.div
          className="text-primary text-5xl font-bold font-playFair font-['Playfair']"
          variants={itemVariant}
        >
          Crafted for Your Special Moments
        </motion.div>
        <motion.div
          className="text-black text-lg font-medium"
          variants={itemVariant}
        >
          Delicate handcrafted favors for weddings, baby showers, graduations,
          and more.
        </motion.div>
        <motion.div
          className="flex items-center justify-center sm:gap-4 gap-2 mt-6 flex-wrap"
          variants={itemVariant}
        >
          <Link href="/shop">
            <Button>Shop Now</Button>
          </Link>
          <Button variant="outline">Customize Your Gift</Button>
        </motion.div>
      </motion.section>

      {/* Image Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={imageVariant}
      >
        <Image
          src="/images/banner.png"
          alt="Banner Image"
          width={500}
          height={390}
        />
      </motion.section>
    </main>
  );
};

export default Banner;
