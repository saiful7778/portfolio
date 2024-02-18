import * as yup from "yup";

export const addBlogSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, "This is too much long!")
    .required("Title is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["published", "private"]),
  editSlug: yup.boolean(),
  slug: yup.string().required("Slug is required"),
  des: yup.string().required("Description is required."),
});
