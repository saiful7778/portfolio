"use client";
import { useState } from "react";
import cn from "@/lib/cn";

const switchStyle = {
  base: "relative inline-flex items-center rounded-full h-6 w-11 border",
  state: {
    offClick: "bg-gray-800 border-gray-700",
    onClick: "bg-blue-700 border-blue-600",
  },
  pointer: {
    base: "relative pointer-events-none inline-block transform rounded-full bg-white shadow transition duration-200 ease-in-out h-5 w-5",
    on: "translate-x-[21px]",
    off: "translate-x-[2px]",
  },
};

const Switch = ({ state, onChange }) => {
  const [toggle, setToggle] = useState(state || false);

  const handleClick = () => {
    if (typeof onChange !== "undefined") {
      onChange();
    }
    setToggle((prop) => !prop);
  };

  return (
    <button
      className={cn(
        switchStyle.base,
        toggle ? switchStyle.state.onClick : switchStyle.state.offClick,
      )}
      onClick={handleClick}
      role="switch"
      type="button"
      aria-checked={toggle}
      data-headlessui-state={`${toggle ? "checked" : ""}`}
      title={toggle ? "on" : "off"}
    >
      <span
        className={cn(
          switchStyle.pointer.base,
          toggle ? switchStyle.pointer.on : switchStyle.pointer.off,
        )}
      ></span>
    </button>
  );
};

export default Switch;
