"use server";
import db from "@/lib/db";
import { loginSchema } from "@/lib/schemas/auth";
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

    const user = await db.user.findFirst({
      where: {
        email: e.email,
      },
      select: {
        isVerified: true,
        access: true,
      },
    });

    if (!user?.isVerified) {
      return {
        success: false,
        message: "Email is not verified",
      };
    }

    if (!user?.access) {
      return {
        success: false,
        message: "You can't access this site",
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
