import * as yup from "yup";

export const addProjectSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, "This is too much long!")
    .required("Title is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["published", "private"]),
  editSlug: yup.boolean(),
  slug: yup.string().when("editSlug", ([editSlug], schema) => {
    if (editSlug) {
      return schema.required("Slug is required");
    }
    return schema;
  }),
  githubLink: yup
    .string()
    .url("Enter a valid URL")
    .required("Github link is required"),
  liveLink: yup
    .string()
    .url("Enter a valid URL")
    .required("Live link is required"),
  shortDes: yup
    .string()
    .max(100, "This is too much long!")
    .required("Short description is required"),
  des: yup.string().required("Description is required."),
});
