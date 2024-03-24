"use server";
import db from "@/lib/db";
import { addBlogSchema } from "@/schemas/blog";

export default async function updateBlog(id, data) {
  try {
    const isValid = await addBlogSchema.isValid(data);
    if (!isValid || !id) {
      throw "Invalid input data";
    }
    const existBlog = await db.blog.findUnique({
      where: { id },
    });
    if (!existBlog) {
      throw "No data available";
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
