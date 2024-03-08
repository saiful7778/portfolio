import db from "@/lib/db";

export default async function getProject(slug) {
  try {
    const project = await db.project.findFirst({
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
