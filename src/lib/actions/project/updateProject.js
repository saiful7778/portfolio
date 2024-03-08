"use server";
import db from "@/lib/db";

export default async function updateProject(id, data) {
  try {
    const existProject = await db.findFirst({
      where: { id },
    });
    if (!existProject) {
      throw new Error("No data available");
    }

    const project = await db.update({
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
