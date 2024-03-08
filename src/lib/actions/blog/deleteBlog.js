"use server";
import db from "@/lib/db";

export default async function deleteBlog(id) {
  try {
    const existBlog = await db.blog.findFirst({
      where: { id },
    });
    if (!existBlog) {
      throw new Error("Blog doesn't exist");
    }
    const data = await db.blog.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
