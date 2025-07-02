import classNames from "classnames";
import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "rounded-br-xl rounded-tl-xl font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-primary text-primary bg-white hover:bg-primary/10 focus:ring-primary",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
