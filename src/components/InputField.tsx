import type { InputProps } from "@/types/types";
import { forwardRef } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input";

interface InputFieldProps extends InputProps {
  label?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, label, required, ...props }, ref) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <Input ref={ref} type={type} {...props} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);
InputField.displayName = "InputField";

export default InputField;
