"use server";
import db from "@/lib/db";

export default async function updateProject(id, data) {
  try {
    const existProject = await db.project.findUnique({
      where: { id },
    });
    if (!existProject) {
      throw "No data available";
    }

    const project = await db.project.update({
      where: {
        id,
      },
      data: data,
    });
    return project;
  } catch (err) {
    throw new Error(err);
  }
}
