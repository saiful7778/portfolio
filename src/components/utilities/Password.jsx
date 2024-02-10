"use client";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Input from "./Input";

const Password = ({ placeholder, name }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPass ? "text" : "password"}
        name={name}
        placeholder={placeholder}
      />
      <button
        onClick={() => setShowPass((l) => !l)}
        className="absolute right-2 top-0 z-30 p-2 text-gray-500"
        type="button"
      >
        {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
      </button>
    </div>
  );
};

export default Password;
