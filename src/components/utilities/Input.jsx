import cn from "@/lib/cn";
import { focus } from "@/theme";
import { useField } from "formik";

const style = {
  base: "w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-500",
  error: "border-red-600 placeholder:text-red-500",
};

const Input = ({ className, ...props }) => {
  const [field, { touched, error }] = useField(props);

  return (
    <div className={className}>
      <input
        className={cn(
          style.base,
          focus.base,
          error && touched && style.error,
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

export default Input;
