import { useEffect, useState } from "react";
import { focus, input } from "@/lib/styles";
import { RxCross2 } from "react-icons/rx";
import cn from "@/lib/utils/cn";
import { useField } from "formik";

const TagInput = ({ className, name, disabled, ...props }) => {
  const [field, { error, touched }, { setValue }] = useField({ name });
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState(field.value);

  const addTag = () => {
    setTags((prop) => [...prop, tagValue]);
    setTagValue("");
  };

  useEffect(() => {
    setValue(tags);
  }, [tags, setValue]);

  const removeTag = (inputTag) => {
    const remain = tags.filter((ele) => ele !== inputTag);
    setTags(remain);
  };

  return (
    <div>
      <div
        className={cn(
          input.base,
          "relative flex flex-wrap items-center gap-1 px-2.5",
          focus.within,
          error && touched && input.error,
          error && touched && focus.withinError,
          className,
        )}
      >
        {tags.map((ele, idx) => (
          <div
            className="flex items-center gap-1 rounded-md border border-gray-700 px-1"
            key={"tag" + idx}
          >
            <span>{ele}</span>
            <button
              className="inline-block rounded-full bg-gray-700 p-0.5"
              onClick={() => removeTag(ele)}
              disabled={disabled}
              type="button"
            >
              <RxCross2 size={10} />
            </button>
          </div>
        ))}
        {tagValue && (
          <div className="absolute bottom-full left-0 z-50 mb-1 w-full rounded-md border border-gray-700 bg-gray-800/30 p-2 backdrop-blur">
            <button
              className="rounded-md border border-gray-700 px-1 hover:bg-gray-700"
              onClick={addTag}
              disabled={disabled}
              type="button"
            >
              {tagValue}
            </button>
          </div>
        )}
        <input
          className="inline-block h-full flex-1 appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && touched && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TagInput;
