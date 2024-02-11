import { useField } from "formik";
import cn from "@/lib/cn";
import { focus } from "@/theme";

const style = {
  base: "w-full appearance-none rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-500",
  error: "border-red-600 text-red-600 placeholder:text-red-500",
};

const Textarea = ({ textLimit, ...props }) => {
  const [field, { touched, error }] = useField(props);

  let text = field.value.length || 0;

  return (
    <div>
      <div className="relative">
        <textarea
          className={cn(
            style.base,
            focus.base,
            error && touched && style.error,
            error && touched && focus.error,
          )}
          maxLength={textLimit}
          {...field}
          {...props}
        ></textarea>
        <div
          className={cn(
            "absolute bottom-2 right-2.5 z-50 text-xs text-gray-400",
            error && touched && "text-red-500",
          )}
        >
          {text}/{textLimit}
        </div>
      </div>
      {error && touched ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default Textarea;
