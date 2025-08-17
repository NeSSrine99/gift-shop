"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "./ui/CartShoppingIcon";
import Button from "./ui/Button";
import ShoppingCart from "./shoppingCart";

const mobileMenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-white p-4 flex items-center justify-between shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-end justify-center">
        <Image
          src="/images/logo.svg"
          alt="Giftopia Logo"
          width={50}
          height={50}
        />
        <span className="text-2xl font-playFair text-primary pb-1">Gift</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center space-x-8 mt-4">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <Link href="/about" className="text-gray-500 hover:text-gray-700">
          About Us
        </Link>
        <Link href="/shop" className="text-gray-500 hover:text-gray-700">
          Shop
        </Link>
        <Link href="/contact" className="text-gray-500 hover:text-gray-700">
          Contact
        </Link>
      </nav>

      {/* Mobile Navigation with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-3">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/shop"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* User and Toggle Menu */}
      <section className="flex items-center gap-4">
        <div className="flex items-center space-x-4 text-primary">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <CartIcon className="sm:relative w-5 h-5" />
          </button>
          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 sm:right-20 right-4 bg-white z-50 shadow-lg rounded-md"
              >
                <ShoppingCart />
              </motion.div>
            )}
          </AnimatePresence>
          <button>
            <FaRegUserCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none border border-gray-100 shadow bg-section p-1 rounded"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
