"use server";
import db from "@/lib/db";
import { updateUserSchema } from "@/lib/schemas/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default async function updateUser(e: z.infer<typeof updateUserSchema>) {
  try {
    const isValid = updateUserSchema.safeParse(e);

    if (!isValid.success) {
      throw new Error("Invalid input data");
    }

    const user = await db.user.update({
      where: {
        email: isValid.data.email,
      },
      data: { ...isValid.data },
    });

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/dashboard");

    return true;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
