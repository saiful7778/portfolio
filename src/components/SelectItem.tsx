import { forwardRef } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Root } from "@radix-ui/react-select";
import Select from "./ui/select";

interface SelectItemProps {
  className?: string;
  label?: string;
  required?: boolean;
  disabled: boolean;
  onValueChange: () => void;
  defaultValue: string;
  placeholder: string;
  selectValue: { text: string; value: string }[];
}

const SelectItem = forwardRef<React.ElementRef<typeof Root>, SelectItemProps>(
  (
    {
      className,
      label,
      required,
      onValueChange,
      defaultValue,
      disabled,
      placeholder,
      selectValue,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
        )}
        <Select
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          {...props}
        >
          <FormControl>
            <Select.trigger disabled={disabled}>
              <Select.value ref={ref} placeholder={placeholder} />
            </Select.trigger>
          </FormControl>
          <Select.content>
            {selectValue.map((value, idx) => (
              <Select.item key={`${label}-select-${idx}`} value={value.value}>
                {value.text}
              </Select.item>
            ))}
          </Select.content>
        </Select>
        <FormMessage />
      </FormItem>
    );
  },
);
SelectItem.displayName = "SelectItem";

export default SelectItem;
