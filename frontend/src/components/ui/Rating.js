"use client";

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {/* النجوم */}
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          const isActive = currentRating <= (hover || rating);

          return (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                className="hidden"
              />
              {isActive ? (
                <FaStar
                  size={24}
                  className="text-yellow-400 transition-transform hover:scale-110"
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                />
              ) : (
                <FaRegStar
                  size={24}
                  className="text-yellow-400 transition-transform hover:scale-110"
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                />
              )}
            </label>
          );
        })}
      </div>

      {/* عدد التقييمات */}
      <span className="text-black font-bold">(13)</span>
    </div>
  );
}
