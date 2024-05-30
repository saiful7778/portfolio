"use client";
import { autoTypingText } from "@/lib/staticData";
import { TypeAnimation } from "react-type-animation";

export default function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={autoTypingText}
      wrapper="span"
      cursor={false}
      repeat={Infinity}
      className="after:animate-blink text-primary after:ml-1 after:text-primary after:content-['>_.']"
    />
  );
}
