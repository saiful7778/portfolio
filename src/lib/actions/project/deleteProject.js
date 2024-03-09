"use server";
import db from "@/lib/db";

export default async function deleteProject(id) {
  try {
    const exitProject = await db.project.findUnique({
      where: { id },
    });
    if (!exitProject) {
      throw "Project doesn't exit";
    }
    const data = await db.project.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
