"use server";
import db from "@/lib/db";

export default async function updateBlog(id, data) {
  try {
    const existBlog = await db.blog.findFirst({
      where: { id },
    });
    if (!existBlog) {
      throw new Error("No data available");
    }
    await db.blog.update({
      where: {
        id,
      },
      data: data,
    });
  } catch (err) {
    throw new Error(err);
  }
}
