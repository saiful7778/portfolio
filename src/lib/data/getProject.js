import prisma from "../../../prisma";

export default async function getProject(slug) {
  try {
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
  }
}
