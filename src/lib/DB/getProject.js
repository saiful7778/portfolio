import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getProject(slug) {
  try {
    await connectToDB();
    const project = await prisma.project.findFirst({
      where: {
        slug,
      },
    });
    if (!project) {
      throw new Error("No data available");
    }
    return project;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
