"use server";
import prisma from "../../../../prisma";

export default async function deleteUser(id) {
  try {
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
  }
}
