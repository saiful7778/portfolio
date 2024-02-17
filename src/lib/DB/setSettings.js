"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function setSettings(id, data) {
  try {
    await connectToDB();
    const res = await prisma.settings.upsert({
      where: {
        id: id,
      },
      update: data,
      create: data,
    });
    if (!res) {
      return {
        success: false,
        message: "Data can not created",
      };
    }
    return {
      success: true,
      data: res,
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
