"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CustomerInfoForm from "./components/CustomerInfoForm";
import GiftDetailsForm from "./components/GiftDetailsForm";
import ImageUpload from "./components/ImageUpload";
import SubmitButton from "./components/SubmitButton";

export default function CustomizePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    product_type: "",
    quantity: 1,
    date: "",
    wrapping: false,
    message: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [eventTypes, setEventTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [eventRes, productRes] = await Promise.all([
          axios.get("http://localhost:1337/api/event-types"),
          axios.get("http://localhost:1337/api/product-types"),
        ]);
        setEventTypes(eventRes.data.data);
        setProductTypes(productRes.data.data);
      } catch (error) {
        console.error("Failed to load category data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isRelation = name === "event_type" || name === "product_type";
    setForm({
      ...form,
      [name]: isRelation
        ? Number(value)
        : type === "checkbox"
        ? checked
        : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageId = null;
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("files", imageFile);
        const uploadRes = await axios.post(
          "http://localhost:1337/api/upload",
          imageData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageId = uploadRes.data[0].id;
      }

      await axios.post("http://localhost:1337/api/customization-requests", {
        data: {
          ...form,
          quantity: Number(form.quantity),
          wrapping: Boolean(form.wrapping),
          image: imageId ? [imageId] : [],
          color: form.color,
        },
      });

      setSuccessMsg(
        "Your request has been sent successfully! We will contact you soon."
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        product_type: "",
        quantity: 1,
        date: "",
        wrapping: false,
        message: "",
      });
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error while sending:", err);
      alert("An error occurred while sending, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Customize Your Gift
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <CustomerInfoForm form={form} handleChange={handleChange} />
        <div className="flex flex-col lg:flex-row  gap-4 w-full">
          <GiftDetailsForm
            form={form}
            handleChange={handleChange}
            eventTypes={eventTypes}
            productTypes={productTypes}
          />
          <ImageUpload
            preview={preview}
            handleImageChange={handleImageChange}
          />
        </div>
        <SubmitButton loading={loading} successMsg={successMsg} />
      </form>
    </div>
  );
}
