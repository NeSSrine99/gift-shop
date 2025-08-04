"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomizePage() {
  const [form, setForm] = useState({
    full_name: "",
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
        console.error("فشل في تحميل بيانات التصنيفات:", error);
      }
    };

    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
      // رفع الصورة إذا كانت موجودة
      let imageId = null;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("files", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:1337/api/upload",
          imageData
        );
        imageId = uploadRes.data[0].id;
      }

      // إرسال الطلب
      await axios.post("http://localhost:1337/api/customization-requests", {
        data: {
          ...form,
          event_type: Number(form.event_type),
          product_type: Number(form.product_type),
          reference_image: imageId ? [imageId] : [],
        },
      });

      setSuccessMsg("تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.");
      setForm({
        full_name: "",
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
      console.error("❌ خطأ أثناء الإرسال:", err);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Customize Your Gift 🎁
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
        {/* معلومات العميل */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🧍 Customer Info</h2>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={form.full_name}
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

        {/* تفاصيل الطلب */}
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

        {/* صورة تقريبية */}
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

        {/* زر الإرسال */}
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
