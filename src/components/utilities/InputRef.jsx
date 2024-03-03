"use client";
import cn from "@/lib/cn";
import { focus, input } from "@/theme";
import { useField } from "formik";
import { useEffect } from "react";

const InputRef = ({ className, refName, customFunction, ...props }) => {
  const [field, { touched, error }, { setValue }] = useField(props);
  const [refField] = useField(refName);

  useEffect(() => {
    setValue(customFunction(refField.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refField.value]);

  return (
    <div className={className}>
      <input
        className={cn(
          input.base,
          focus.base,
          error && touched && input.error,
          error && touched && focus.error,
          className,
        )}
        {...field}
        {...props}
      />
      {error && touched ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default InputRef;
