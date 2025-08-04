"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
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
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageId = uploadRes.data[0].id;
      }
      console.log("Sending to Strapi:", {
        name: form.name,
        event_type: form.event_type,
        product_type: form.product_type,
      });

      await axios.post("http://localhost:1337/api/customization-requests", {
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: Number(form.quantity),
          date: form.date,
          wrapping: Boolean(form.wrapping),
          message: form.message,
          event_type: form.event_type,
          product_type: form.product_type,
          image: imageId ? [imageId] : [],
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
    console.log("Form values before send:", form);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Customize Your Gift 🎁
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🧍 Customer Info</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎁 Gift Details</h2>

          <select
            name="event_type"
            className="w-full border p-2 rounded"
            value={form.event_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>

          <select
            name="product_type"
            className="w-full border p-2 rounded"
            value={form.product_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Product Type</option>
            {productTypes.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="w-full border p-2 rounded"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="wrapping"
              checked={form.wrapping}
              onChange={handleChange}
            />
            Gift Wrapping
          </label>

          <textarea
            name="message"
            placeholder="Additional message or note"
            rows={4}
            className="w-full border p-2 rounded"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🖼️ Reference Image</h2>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded shadow-md w-full"
            />
          )}
        </div>

        <div className="md:col-span-3 mt-6 text-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
          {successMsg && (
            <p className="mt-4 text-green-600 font-semibold">{successMsg}</p>
          )}
        </div>
      </form>
    </div>
  );
}
