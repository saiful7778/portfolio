"use client";
import { bannerAutoTypingText } from "@/staticData";
import { TypeAnimation } from "react-type-animation";

const AutoType = () => {
  return (
    <TypeAnimation
      sequence={bannerAutoTypingText}
      wrapper="span"
      cursor={false}
      repeat={Infinity}
      className="type text-accent-color ml-1"
    />
  );
};

export default AutoType;
