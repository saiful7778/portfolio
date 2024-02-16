"use client";
import Select from "@/components/utilities/Select";
import Steps from "@/components/utilities/Steps";
import { useState } from "react";

const ReCaptcha = () => {
  const options = [{ value: "on" }, { value: "off" }, { value: "custom" }];
  const selectOptions = [
    { value: "projectComment", text: "Project public comment" },
    { value: "projectAdd", text: "Add project" },
    { value: "projectUpdate", text: "Update project" },
    { value: "userUpdate", text: "Update user" },
    { value: "register", text: "Register" },
    { value: "login", text: "Login" },
  ];
  const [select, setSelect] = useState(options[0].value);

  return (
    <div className="mt-3 flex w-fit items-center gap-2">
      <span>ReCaptcha</span>
      <span className="text-center">:</span>
      <Steps
        options={options}
        name="reCaptcha"
        select={select}
        setSelect={setSelect}
      />
      {select === "custom" && (
        <div className="ml-5">
          <Select
            className="mr-2"
            name="reCaptchaOn"
            defaultValue="--select-reCaptcha-ON-page"
            options={selectOptions}
          />
          <Select
            name="reCaptchaOff"
            defaultValue="--select-reCaptcha-OFF-page"
            options={selectOptions}
          />
        </div>
      )}
    </div>
  );
};

export default ReCaptcha;
