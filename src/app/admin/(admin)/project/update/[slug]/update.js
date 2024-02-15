"use server";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../../../../../prisma";

export default async function updateUser({ query, data }) {
  try {
    await connectToDB();

    const exitProject = await prisma.project.findFirst({
      where: { id: query.id },
    });
    if (!exitProject) {
      return {
        success: false,
        message: "No data available",
      };
    }

    const project = await prisma.project.update({
      where: {
        id: query.id,
        email: query.email,
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
