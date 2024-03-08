"use server";
import db from "@/lib/db";

export default async function deleteProject(id) {
  try {
    const exitProject = await db.findFirst({
      where: { id },
    });
    if (!exitProject) {
      throw new Error("Project doesn't exit");
    }
    const data = await db.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
