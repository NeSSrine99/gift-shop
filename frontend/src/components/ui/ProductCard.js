import React from "react";
import Favorite from "./Favorite";

function ProductCard({ product }) {
  const baseURL = "http://localhost:1337";

  const imageUrl = product?.image?.url
    ? `${baseURL}${product.image.url}`
    : "/images/wedding.jpeg";

  return (
    <div className="border-2 border-primary w-[270px] hover:shadow-md p-2 hover:cursor-pointer rounded-lg transition-all duration-300 hover:scale-110">
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
      <div className="p-3 rounded-b-lg">
        <div className="flex flex-wrap items-center justify-between ">
          <h2 className=" ">{product?.name || "Unknown Product"}</h2>
          <p className="text-[14px] text-gray-500">
            {product?.product_type || "no category"}{" "}
          </p>
        </div>
        <h2 className="text-gray-600 flex gap-1 items-center">
          ${product?.price || "0.00"}
        </h2>
      </div>
    </div>
  );
}

export default ProductCard;
