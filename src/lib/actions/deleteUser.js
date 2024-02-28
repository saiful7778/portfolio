"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function deleteUser(id) {
  try {
    await connectToDB();
    const existUser = await prisma.user.findFirst({
      where: { id },
    });
    if (!existUser) {
      throw new Error("User doesn't exist");
    }
    await prisma.user.delete({
      where: { id },
    });
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
