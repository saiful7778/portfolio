"use server";
import prisma from "../../../../prisma";

export default async function getSettings() {
  try {
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
  }
}
