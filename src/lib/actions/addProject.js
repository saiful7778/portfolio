"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function addProject(projectData) {
  try {
    await connectToDB();
    const exist = await prisma.project.findUnique({
      where: {
        slug: projectData.slug,
      },
    });
    if (exist) {
      return {
        success: false,
        message: "Project is already exist",
      };
    }
    const data = await prisma.project.create({
      data: projectData,
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
