"use client";

import React from "react";
import Favorite from "./Favorite";
import Button from "./Button";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace("/api", "") ||
    "http://localhost:1337";

  const imageUrl = product?.image?.[0]?.url
    ? `${baseURL}${product.image[0].url}`
    : "/images/wedding.jpeg";

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: imageUrl,
      price: Number(product.price) || 0,
      event_type: product.event_type,
      product_type: product.product_type,
    });
  };

  return (
    <div className="bg-white border-2 border-primary w-[270px] hover:shadow-md p-2 hover:cursor-pointer rounded-lg transition-all duration-300 hover:scale-110">
      <div className="relative">
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="w-full rounded-lg h-[180px] object-cover"
        />
        <div className="absolute top-2 right-2">
          <Favorite />
        </div>
      </div>
      <div className=" rounded-b-lg space-y-2 mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <h2>{product?.name || "Unknown Product"}</h2>
          <p className="text-[14px] text-gray-500">
            {product?.event_type?.name || "no category"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600 flex gap-1 items-center">
            ${product?.price || "0.00"}
          </h2>
          <Button onClick={handleAdd} className="cursor-pointer">
            <FaCartPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
