import React from "react";
import CategoryCard from "./ui/CategoryCard";
import categories from "@/data/categories";

const Categories = () => {
  return (
    <section className="flex flex-col gap-10 py-20 lg:px-[120px] sm:px-9 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-3">Shop by Occasion</h2>
        <p className="text-gray-600 text-lg">
          Explore our wide range of gift categories.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
