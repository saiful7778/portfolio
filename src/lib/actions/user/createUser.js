"use server";
import db from "@/lib/db";
import { hash } from "bcrypt";

export default async function createUser(userData) {
  try {
    const exist = await db.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (exist) {
      throw new Error("user is already exist!");
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
