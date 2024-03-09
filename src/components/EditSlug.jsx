"use client";
import { useField } from "formik";
import CheckboxItem from "@/components/utilities/formik/CheckboxItem";
import InputRef from "@/components/utilities/InputRef";
import cn from "@/lib/utils/cn";

const EditSlug = ({
  checkboxName,
  checkboxLabel,
  refName,
  inputName,
  inputPlaceholder,
}) => {
  const [{ value }] = useField(checkboxName);
  return (
    <>
      <CheckboxItem
        name={checkboxName}
        id={checkboxName}
        label={checkboxLabel}
      />
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          value
            ? "mt-1 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <InputRef
          refName={refName}
          className="overflow-hidden"
          customFunction={(inputData) =>
            inputData.toLowerCase().replace(/\s/g, "_").replace(/-/g, "")
          }
          type="text"
          placeholder={inputPlaceholder}
          name={inputName}
          maxLength={50}
        />
      </div>
    </>
  );
};

export default EditSlug;
