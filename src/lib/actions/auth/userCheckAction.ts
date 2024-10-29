"use server";

import db from "@/lib/db";
import { loginSchema } from "@/lib/schema/authSchema";
import type { z } from "zod";

export default async function userCheckAction(
  inputData: z.infer<typeof loginSchema>,
) {
  try {
    const validateData = loginSchema.safeParse(inputData);

    if (!validateData.success) {
      throw new Error("Your input data is invalid");
    }

    const user = await db.user.findFirst({
      where: {
        email: inputData.email,
      },
      select: {
        isVerified: true,
        access: true,
      },
    });

    if (!user?.isVerified) {
      throw new Error("Email is not verified");
    }

    if (!user?.access) {
      throw new Error("You can't access this site");
    }

    return {
      success: true,
      data: "user is verified",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
