"use server";
import prisma from "../../../../prisma";

export default async function deleteProject(id) {
  try {
    const exitProject = await prisma.project.findFirst({
      where: { id },
    });
    if (!exitProject) {
      throw new Error("Project doesn't exit");
    }
    const data = await prisma.project.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
