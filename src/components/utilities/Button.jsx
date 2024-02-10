import cn from "@/lib/cn";
import Link from "next/link";
import { focus } from "@/theme";

const style = {
  base: "rounded font-semibold cursor-pointer shadow duration-200 active:focus:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
  primary: "border border-gray-50 bg-gray-50 text-accent-color",
  outline:
    "border border-gray-50 text-white hover:bg-gray-50 hover:text-accent-color",
  confirm:
    "border border-green-600 bg-green-700 text-white hover:bg-green-600 disabled:hover:bg-green-700",
  cancel: "border border-red-600 bg-red-700 text-white hover:bg-red-600",
  size: {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-1 text-base",
    lg: "px-5 py-2 text-base",
  },
  shape: {
    circle: "rounded-full p-1",
    "icon-text-button": "inline-flex items-center justify-center gap-1",
    "icon-button": "p-1",
  },
};

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  variant,
  size = "md",
  shape,
  href,
  ...props
}) => {
  const isLink = typeof href !== "undefined";
  const Component = isLink ? Link : "button";
  return (
    <Component
      onClick={onClick}
      className={cn(
        style.base,
        variant === "primary" && style.primary,
        variant === "primary-outline" && style.outline,
        variant === "confirm" && style.confirm,
        variant === "cancel" && style.cancel,
        style.size[size],
        focus.base,
        shape === "circle" && style.shape.circle,
        shape === "icon-text-button" && style.shape["icon-text-button"],
        shape === "icon-button" && style.shape["icon-button"],
        className,
      )}
      href={href}
      type={isLink ? undefined : type}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
