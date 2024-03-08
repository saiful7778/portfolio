"use server";
import prisma from "../../../prisma";

export default async function createProject(projectData) {
  try {
    const exist = await prisma.project.findUnique({
      where: {
        slug: projectData.slug,
      },
    });
    if (exist) {
      throw new Error("Project is already exist");
    }
    const data = await prisma.project.create({
      data: projectData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
