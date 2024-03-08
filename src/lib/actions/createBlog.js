"use server";
import prisma from "../../../prisma";

export default async function createBlog(blogData) {
  try {
    const exist = await prisma.blog.findUnique({
      where: {
        slug: blogData.slug,
      },
    });
    if (exist) {
      throw new Error("Blog is already exist");
    }
    const data = await prisma.blog.create({
      data: blogData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
