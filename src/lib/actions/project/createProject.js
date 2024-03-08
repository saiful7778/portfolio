"use server";
import db from "@/lib/db";

export default async function createProject(projectData) {
  try {
    const exist = await db.findUnique({
      where: {
        slug: projectData.slug,
      },
    });
    if (exist) {
      throw new Error("Project is already exist");
    }
    const data = await db.create({
      data: projectData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
