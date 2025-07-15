"use client";

import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Favorite({ className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={`cursor-pointer  p-2 bg-black/30 rounded-full ${className}`}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? (
        <GoHeartFill
          size={24}
          className="text-white transition-transform transform hover:scale-110"
        />
      ) : (
        <GoHeart
          size={24}
          className="text-white transition-transform transform hover:scale-110"
        />
      )}
    </div>
  );
}
