"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getSettings() {
  try {
    await connectToDB();
    const settings = await prisma.settings.findMany();
    if (!settings) {
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: settings,
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
