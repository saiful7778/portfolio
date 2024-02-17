"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";
import { hash } from "bcrypt";

export default async function createUser(userData) {
  try {
    await connectToDB();
    const exist = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (exist) {
      return {
        success: false,
        message: "user is already exist!",
      };
    }
    const hashedPassword = await hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        hashedPassword,
        image: userData.image,
      },
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
