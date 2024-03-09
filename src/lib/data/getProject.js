import db from "@/lib/db";

export async function getProjectBySlug(slug) {
  try {
    const project = await db.project.findFirst({
      where: {
        slug,
      },
    });
    if (!project) {
      throw "No data available";
    }
    return project;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getProjectById(id) {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) {
      throw "No data available";
    }
    return project;
  } catch (err) {
    throw new Error(err);
  }
}
