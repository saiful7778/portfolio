"use server";
import prisma from "../../../prisma";
import { hash } from "bcrypt";

export default async function createUser(userData) {
  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (exist) {
      throw new Error("user is already exist!");
    }
    const hashedPassword = await hash(userData.password, 10);
    await prisma.user.create({
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
