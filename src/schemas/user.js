import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string(),
  role: yup.string().oneOf(["user", "admin"]),
});
