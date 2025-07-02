import React from "react";

const ServiceCard = ({
  id,
  title = "Handcrafted with Love",
  description = "Every gift is carefully made by hand, with attention to detail and a lot of love.",
}) => {
  return (
    <div
      className="bg-white flex flex-col gap-4 border-1 border-gray-50 rounded-lg p-4 shadow-md
      hover:bg-gradient-to-r hover:from-primary hover:to-secondary
      transition-colors duration-300"
    >
      <h3 className="text-black text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
