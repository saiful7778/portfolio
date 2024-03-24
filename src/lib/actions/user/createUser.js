"use server";
import db from "@/lib/db";
import { registerSchema } from "@/schemas/authentication";
import { hash } from "bcrypt";

export default async function createUser(userData) {
  try {
    const isValid = await registerSchema.isValid(userData);
    if (!isValid) {
      throw "Invalid input data";
    }
    const exist = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (exist) {
      throw "user is already exist!";
    }
    const hashedPassword = await hash(userData.password, 10);
    await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        hashedPassword,
        image: userData.image,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}
