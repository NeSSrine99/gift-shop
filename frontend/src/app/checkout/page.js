"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BsTrash3 } from "react-icons/bs";
import { useCart } from "@/context/CartContext";

export default function ShoppingCart() {
  // 🛒 useCart() brings real cart data and functions
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  // 🧾 User checkout form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
  });

  // 🔧 Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🚀 Submit order to Strapi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        data: {
          ...formData,
          total: getTotalPrice(),
          products: cartItems,
          status: "pending",
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
        orderData
      );

      alert("✅ Order sent successfully!");
      clearCart(); // clear cart after success
      setFormData({
        fullName: "",
        email: "",
        address: "",
        city: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        {/* 🧾 Checkout form */}
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />

        {/* 🛒 Cart items */}
        <motion.div
          key="cart"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="p-4 bg-gray-50 rounded-2xl shadow-inner mt-4"
        >
          <h2 className="text-xl font-bold my-4 text-center text-blue-600">
            My Cart
          </h2>

          {cartItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 text-gray-500 text-center"
            >
              No items in your cart.
            </motion.div>
          ) : (
            <>
              <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-sm truncate max-w-[130px]">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {item.price} DT
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mx-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BsTrash3 size={18} />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Total */}
              <div className="text-right font-bold mt-4">
                Total: {getTotalPrice()} DT
              </div>
            </>
          )}
        </motion.div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
