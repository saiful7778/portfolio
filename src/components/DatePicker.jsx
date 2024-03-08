"use client";
import { focus } from "@/lib/styles";
import cn from "@/lib/utils/cn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const style = {
  base: "border border-gray-700 select-none appearance-none rounded-md bg-gray-900 px-3 py-2 text-sm",
  size: {
    xs: "min-w-52",
    sm: "min-w-64",
    md: "min-w-80",
  },
};

const DatePickerComp = ({ label, date, setDate, className }) => {
  return (
    <div>
      <div className="mb-1 ml-2 text-xs font-medium text-gray-300">{label}</div>
      <DatePicker
        className={cn(style.base, style.size.md, focus.base, className)}
        selected={date}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
};

export default DatePickerComp;
