import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn manage tailwindcss classes
 * @param inputs all input classes
 * @returns
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
