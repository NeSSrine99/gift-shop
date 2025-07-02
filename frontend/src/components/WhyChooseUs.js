import React from "react";

import services from "@/data/services";
import ServiceCard from "./ui/ServiceCard";

const WhyChooseUs = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-bg py-20 lg:px-[120px] sm:px-9 px-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
        />
      ))}
    </section>
  );
};

export default WhyChooseUs;
