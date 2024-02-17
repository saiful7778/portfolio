"use server";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../prisma";

export default async function deleteProject(id) {
  try {
    await connectToDB();
    const exitProject = await prisma.project.findFirst({
      where: { id },
    });
    if (!exitProject) {
      return {
        success: false,
        message: "Project doesn't exit",
      };
    }
    const data = await prisma.project.delete({
      where: { id },
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
