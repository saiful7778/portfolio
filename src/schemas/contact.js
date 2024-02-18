import * as yup from "yup";

export const contactSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^(01[3-9])\d{8}$/, "Phone number is not valid"),
  subject: yup.string().required("Subject is required"),
  details: yup.string().required("Details is required."),
});
