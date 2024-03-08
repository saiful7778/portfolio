import db from "@/lib/db";

export default async function getProjects() {
  try {
    const projects = await db.project.findMany();
    return projects;
  } catch (err) {
    throw new Error(err);
  }
}
