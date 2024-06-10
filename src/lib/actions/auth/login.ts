"use server";
import { loginSchema } from "@/lib/schemas/auth";
import { getUserByEmail } from "@/lib/utils/getUser";
import { z } from "zod";

export default async function login(e: z.infer<typeof loginSchema>) {
  try {
    const isValid = loginSchema.safeParse(e);

    if (!isValid.success) {
      return {
        success: false,
        message: "Invalid input data",
      };
    }

    const user = await getUserByEmail(e.email);

    if (!user?.isVerified) {
      return {
        success: false,
        message: "Email is not verified",
      };
    }

    return {
      success: true,
      message: "user verified",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
