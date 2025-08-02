// components/ui/CategoryCard.js
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const STRAPI_URL = "http://localhost:1337";

const CategoryCard = ({ name = "title", image }) => {
  const router = useRouter();

  const imageUrl = image?.startsWith("http") ? image : `${STRAPI_URL}${image}`;

  const handleClick = () => {
    router.push(`/shop?event_types=${name}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="w-36 h-36 cursor-pointer rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative flex items-center justify-center"
      onClick={handleClick}
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute bottom-1 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-semibold text-center py-2 px-1">
        {name}
      </div>
    </motion.div>
  );
};

export default CategoryCard;
