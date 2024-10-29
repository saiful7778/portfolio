"use server";
import { registrationSchema } from "@/lib/schema/authSchema";
import type { z } from "zod";
import { genSalt, hash } from "bcrypt";
import db from "@/lib/db";

export default async function registerAction(
  inputData: z.infer<typeof registrationSchema>,
) {
  try {
    const validateData = registrationSchema.safeParse(inputData);

    if (!validateData.success) {
      throw new Error("Your input data is invalid");
    }

    const { fullName, email, password } = validateData.data;

    const existUser = await db.user.findFirst({
      where: { email },
    });

    if (existUser) {
      throw new Error("User is already exist");
    }

    const saltValue = await genSalt(10);
    const hashedPassword = await hash(password, saltValue);

    const user = await db.user.create({
      data: {
        fullName,
        email,
        hashedPassword,
      },
    });

    if (Object.keys(user).length > 0) {
      return {
        success: true,
        data: "User is created successfully",
      };
    }

    throw new Error("User not created.");
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
