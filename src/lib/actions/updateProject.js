"use server";
import prisma from "../../../prisma";

export default async function updateProject(id, data) {
  try {
    const existProject = await prisma.project.findFirst({
      where: { id },
    });
    if (!existProject) {
      throw new Error("No data available");
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: data,
    });
    return project;
  } catch (err) {
    throw new Error(err);
  }
}
