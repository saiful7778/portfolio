import prisma from "../../../prisma";

export default async function getProjects() {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (err) {
    throw new Error(err);
  }
}
