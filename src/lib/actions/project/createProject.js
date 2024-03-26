"use server";
import db from "@/lib/db";

export default async function createProject(projectData) {
  try {
    const exist = await db.project.findFirst({
      where: {
        slug: projectData.slug,
      },
    });
    if (exist) {
      throw "Project is already exist";
    }

    const data = await db.project.create({
      data: projectData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
