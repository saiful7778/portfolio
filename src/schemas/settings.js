import * as Yup from "yup";

export const settingsSchema = Yup.object().shape({
  reCaptcha: Yup.string().required("Required"),
  reCaptchaOnPage: Yup.array().when("reCaptcha", ([reCaptcha], schema) => {
    if (reCaptcha === "custom") {
      return schema.min(1, "Please select at least one option");
    }
    return schema;
  }),
  blockPage: Yup.array(),
});
