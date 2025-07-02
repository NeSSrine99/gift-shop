"use client";

import React from "react";
import { motion } from "framer-motion";

import services from "@/data/services";
import ServiceCard from "./ui/ServiceCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyChooseUs = () => {
  return (
    <section className="bg-bg py-20 lg:px-[120px] sm:px-9 px-4">
      {/* العنوان والنص */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
        <p className="text-gray-600 text-lg">
          Discover the benefits of our personalized gifts and exceptional
          service.
        </p>
      </div>

      {/* شبكة العناصر مع الحركة */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <ServiceCard
              id={service.id}
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
