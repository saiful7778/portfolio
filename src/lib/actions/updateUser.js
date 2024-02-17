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
      return {
        success: false,
        message: "User doesn't exist",
      };
    }
    const user = await prisma.user.update({
      where: {
        id,
        email,
      },
      data,
    });
    return {
      success: true,
      data: user,
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
