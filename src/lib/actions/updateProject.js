"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function updateProject(id, data) {
  try {
    await connectToDB();
    const existProject = await prisma.project.findFirst({
      where: { id },
    });
    if (!existProject) {
      return {
        success: false,
        message: "No data available",
      };
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: data,
    });
    return {
      success: true,
      data: project,
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
