import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getProjects() {
  try {
    await connectToDB();
    const projects = await prisma.project.findMany();
    return projects;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
