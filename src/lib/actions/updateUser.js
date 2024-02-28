"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function updateUser(id, email, data) {
  try {
    await connectToDB();
    const existUser = await prisma.user.findFirst({
      where: { id, email },
    });
    if (!existUser) {
      throw new Error("User doesn't exist");
    }
    await prisma.user.update({
      where: {
        id,
        email,
      },
      data,
    });
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
