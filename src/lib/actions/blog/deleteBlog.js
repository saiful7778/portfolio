"use server";
import db from "@/lib/db";

export default async function deleteBlog(id) {
  try {
    if (!id) {
      throw "Invalid input data";
    }
    const existBlog = await db.blog.findUnique({
      where: { id },
    });
    if (!existBlog) {
      throw "Blog doesn't exist";
    }
    const data = await db.blog.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
