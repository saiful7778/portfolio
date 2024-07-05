import * as z from "zod";

export const projectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  status: z.enum(["private", "public"], {
    required_error: "Status is required",
  }),
  slug: z
    .string({ required_error: "Slug is required" })
    .min(1, "Slug is required"),
  githubUrl: z
    .string({ required_error: "GitHub link is required" })
    .url("Invalid url"),
  projectLiveUrl: z
    .string({ required_error: "Project live link is required" })
    .url("Invalid url"),
  tags: z
    .array(
      z
        .string({ required_error: "Tag text is required" })
        .min(1, "Tag text is required")
        .max(10, "Text is too long"),
    )
    .min(1, "Tags is required")
    .max(10, "Too many tags"),
  shortDes: z
    .string({ required_error: "Short description is required" })
    .min(1, "Short description is required")
    .max(200, "Short description is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required")
    .max(10000, "Description is too long"),
});
