import * as z from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Email is required",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, {
      message: "Password is required",
    })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
      message:
        "Password must required: Capital letter and a Special character.",
    }),
});

export const updateUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Email is required",
  }),
  role: z.enum(["user", "admin"], { required_error: "User role is required" }),
  access: z.boolean({ required_error: "User access is required" }),
});
