"use client";

import Link from "next/link";
import { BsTrash3 } from "react-icons/bs";
import { SiCcleaner } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Button from "./ui/Button";

export default function ShoppingCart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      <motion.div
        key="cart"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
        className="p-4 bg-white rounded-2xl shadow-defaultCard w-[90vw] sm:w-[350px] md:w-[400px] max-w-full"
      >
        <h2 className="text-xl font-bold my-4 text-center text-primary">
          Mon panier
        </h2>

        {cartItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 text-gray-500 text-center"
          >
            Aucun article dans votre panier.
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
                    className="flex justify-between items-center border-b border-textLight pb-2"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[130px]">
                          {item.name}
                        </h3>
                        <p className="text-[10px] sm:text-[12px] text-gray-600">
                          {item.price} DT
                        </p>
                      </div>

                      {/* Quantity Control */}
                      <div className="mx-2 flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded text-xs sm:text-sm"
                        >
                          -
                        </button>
                        <span className="text-xs sm:text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded text-xs sm:text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <BsTrash3 size={18} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Total Price */}
            <div className="text-right font-bold mt-4">
              Total: {getTotalPrice()} TND
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center  gap-2 mt-4">
              {/* Clear Cart */}
              <Button variant="tertiary" onClick={clearCart} className=" ">
                <SiCcleaner size={22} className="mr-2" />
              </Button>

              {/* Checkout Button */}
              <div className="w-full">
                <Link href="/checkout" className="w-full">
                  <Button variant="primary" className="w-full">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
