"use server";
import db from "@/lib/db";

export default async function createBlog(blogData) {
  try {
    const exist = await db.blog.findUnique({
      where: {
        slug: blogData.slug,
      },
    });
    if (exist) {
      throw "Blog is already exist";
    }
    const data = await db.blog.create({
      data: blogData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
