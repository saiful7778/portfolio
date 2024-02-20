import { FaUserAstronaut } from "react-icons/fa6";
import cn from "@/lib/cn";
import Image from "next/image";

const style = {
  base: "inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-50",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const Avatar = ({ className, photoURL, size = "md", alt = "user image" }) => {
  const imgSize =
    size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 0;
  return (
    <div
      className={cn(
        style.base,
        size === "sm" && style.sm,
        size === "md" && style.md,
        size === "lg" && style.lg,
        className,
      )}
    >
      {photoURL ? (
        <Image
          className="object-cover object-center"
          src={photoURL}
          width={imgSize}
          height={imgSize}
          alt={alt}
        />
      ) : (
        <FaUserAstronaut size={20} />
      )}
    </div>
  );
};

export default Avatar;
