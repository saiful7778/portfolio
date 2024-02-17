import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getProjects() {
  try {
    await connectToDB();
    const projects = await prisma.project.findMany();
    if (!projects) {
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: projects,
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
