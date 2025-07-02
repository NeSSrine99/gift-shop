"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CategoryCard = ({ id, title, image, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="w-36 h-36 cursor-pointer rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative flex items-center justify-center"
      onClick={onClick}
    >
      {/* Image fills the circle */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Title on bottom with gradient overlay */}
      <div className="absolute bottom-1 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-semibold text-center py-2 px-1">
        {title}
      </div>
    </motion.div>
  );
};

export default CategoryCard;
