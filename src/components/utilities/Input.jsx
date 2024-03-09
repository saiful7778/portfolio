import { focus, input } from "@/lib/styles";
import cn from "@/lib/utils/cn";

const Input = ({ size, value, onChange, placeholder, name, type }) => {
  return (
    <input
      type={type}
      className={cn(input.base, focus.base, size === "sm" && "px-2 py-1")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
