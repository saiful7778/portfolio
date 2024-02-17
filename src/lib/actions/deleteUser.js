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
      return {
        success: false,
        message: "User doesn't exist",
      };
    }
    const data = await prisma.user.delete({
      where: { id },
    });
    return {
      success: true,
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}
