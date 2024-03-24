"use server";
import db from "@/lib/db";
import { registerSchema } from "@/schemas/authentication";

export default async function updateUser(id, email, data) {
  try {
    const isValid = await registerSchema.isValid(data);
    if (!id || !email || !isValid) {
      throw "Invalid input data";
    }
    const existUser = await db.user.findFirst({
      where: { id, email },
    });
    if (!existUser) {
      throw "User doesn't exist";
    }
    await db.user.update({
      where: {
        id,
        email,
      },
      data,
    });
  } catch (err) {
    throw new Error(err);
  }
}
