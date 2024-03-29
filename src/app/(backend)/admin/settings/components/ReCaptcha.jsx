"use client";
import Checkbox from "@/components/utilities/formik/Checkbox";
import Radio from "@/components/utilities/formik/Radio";
import { useField } from "formik";

const ReCaptcha = () => {
  const [{ value: reCaptchaOption }] = useField("reCaptcha");

  const options = [
    { value: "on", text: "On" },
    { value: "off", text: "Off" },
    { value: "custom", text: "Custom" },
  ];
  const selectOptions = [
    { value: "projectComment", text: "Project public comment" },
    { value: "projectAdd", text: "Add project" },
    { value: "blogAdd", text: "Add blog" },
    { value: "projectUpdate", text: "Update project" },
    { value: "blogUpdate", text: "Update blog" },
    { value: "userUpdate", text: "Update user" },
    { value: "contactPage", text: "Contact page" },
    { value: "register", text: "Register" },
    { value: "login", text: "Login" },
  ];

  return (
    <div className="mt-3 flex gap-2">
      <span className="w-full max-w-36">ReCaptcha</span>
      <span className="w-full max-w-8 text-center">:</span>
      <div>
        <Radio options={options} name="reCaptcha" />
        {reCaptchaOption === "custom" && (
          <Checkbox
            options={selectOptions}
            name="reCaptchaOnPage"
            label="Select where you want reCaptcha"
          />
        )}
      </div>
    </div>
  );
};

export default ReCaptcha;
