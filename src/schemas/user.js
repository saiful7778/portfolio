import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  role: yup.string().oneOf(["user", "admin"]).required("Role is required"),
});
