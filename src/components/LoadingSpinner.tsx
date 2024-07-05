"use client";
import cn from "@/lib/utils/cn";
import Spinner from "./Spinner";

// TODO: add this Loading component in loadin page
const LoadingSpinner = ({
  fullPage,
  size = 60,
}: {
  fullPage?: string;
  size?: number;
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center overflow-hidden",
        fullPage && "h-screen",
      )}
    >
      <Spinner size={size} />
    </div>
  );
};

export default LoadingSpinner;
