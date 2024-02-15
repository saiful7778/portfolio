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
      return {
        success: false,
        message: "No data available",
      };
    }
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
