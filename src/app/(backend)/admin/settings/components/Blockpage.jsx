"use client";
import CheckboxItem from "@/components/utilities/formik/CheckboxItem";

const Blockpage = () => {
  const blockPageOptions = [{ value: "registerPage", text: "Register page" }];

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="w-full max-w-36">Block page</span>
      <span className="w-full max-w-8 text-center">:</span>
      <div>
        {blockPageOptions.map((ele) => (
          <CheckboxItem
            key={ele.value}
            id={ele.value}
            label={ele.text}
            name="blockPage"
            value={ele.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Blockpage;
