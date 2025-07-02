"use client";

import React from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Contact = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 bg-white py-20 lg:px-[120px] sm:px-9 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
    >
      <section className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="md:text-4xl text-2xl font-semibold">
          Let Your Moments Bloom with Beauty
        </h1>
        <p className="md:text-xl text-sm font-medium">
          From elegant favors to personalized touches, we help you tell your
          story — one gift at a time.
        </p>
      </section>
      <Button>Customize My Gift</Button>
    </motion.div>
  );
};

export default Contact;
