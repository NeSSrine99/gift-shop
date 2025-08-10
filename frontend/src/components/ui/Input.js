import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  options = [],
  checked,
  accept,
  preview,
  required = false,
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || value || checked;

  const labelVariants = {
    initial: {
      top: "50%",
      left: "0.75rem",
      fontSize: "1rem",
      translateY: "-50%",
      color: "#aaa",
    },
    floating: {
      top: "0%",
      left: "0.75rem",
      fontSize: "0.75rem",
      translateY: "-50%",
      color: "#db8997",
    },
  };

  const baseInputClass =
    "block w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  // ============ SELECT ============
  if (type === "select") {
    return (
      <div className="relative ">
        <motion.label
          htmlFor={name}
          className="absolute bg-white px-1 pointer-events-none"
          variants={labelVariants}
          animate={shouldFloat ? "floating" : "initial"}
          transition={{ duration: 0.2 }}
        >
          {placeholder}
        </motion.label>

        <select
          name={name}
          id={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={classNames(baseInputClass, className, "")}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // ============ CHECKBOX ============
  if (type === "checkbox") {
    return (
      <motion.label
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="accent-primary w-4 h-4"
        />
        <span className="text-sm text-gray-500 font-poppins">
          {placeholder}
        </span>
      </motion.label>
    );
  }

  // ============ TEXTAREA ============
  if (type === "textarea") {
    return (
      <div className="relative ">
        <motion.label
          htmlFor={name}
          className="absolute bg-white px-1 pointer-events-none"
          variants={labelVariants}
          animate={shouldFloat ? "floating" : "initial"}
          transition={{ duration: 0.2 }}
        >
          {placeholder}
        </motion.label>
        <textarea
          name={name}
          id={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          rows={4}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={classNames(baseInputClass, className, "")}
        />
      </div>
    );
  }

  // ============ FILE ============
  if (type === "file") {
    return (
      <motion.div
        className="space-y-2 "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="text-sm text-gray-600 font-medium">
          {placeholder}
        </label>
        <input
          type="file"
          name={name}
          onChange={onChange}
          accept={accept}
          className=" border border-dashed border-gray-400 p-3 rounded cursor-pointer bg-gray-50 hover:border-purple-500 transition"
        />
        {preview && (
          <motion.img
            src={preview}
            alt="Preview"
            className="rounded shadow-md w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.div>
    );
  }

  // ============ DEFAULT INPUT ============
  return (
    <div className="relative ">
      <motion.label
        htmlFor={name}
        className="absolute bg-white px-1 pointer-events-none"
        variants={labelVariants}
        animate={shouldFloat ? "floating" : "initial"}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.label>

      <input
        type={type}
        name={name}
        id={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames(baseInputClass, className, "")}
      />
    </div>
  );
}
