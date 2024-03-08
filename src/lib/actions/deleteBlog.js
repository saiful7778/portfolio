"use server";
import prisma from "../../../prisma";

export default async function deleteBlog(id) {
  try {
    const existBlog = await prisma.blog.findFirst({
      where: { id },
    });
    if (!existBlog) {
      throw new Error("Blog doesn't exist");
    }
    const data = await prisma.blog.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
