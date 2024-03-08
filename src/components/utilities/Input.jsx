import cn from "@/lib/utils/cn";
import { input, focus } from "@/lib/styles";
import { useField } from "formik";

const Input = ({ className, ...props }) => {
  const [field, { touched, error }] = useField(props);

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

export default Input;
