import React from "react";
import Button from "./ui/Button";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-white py-20 lg:px-[120px] sm:px-9 px-4">
      <section className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className=" text-4xl font-semibold">
          Let Your Moments Bloom with Beauty
        </h1>
        <p className=" text-xl font-medium">
          From elegant favors to personalized touches, we help you tell your
          story — one gift at a time.
        </p>
      </section>
      <Button>Customize My Gift</Button>
    </div>
  );
};

export default Contact;
