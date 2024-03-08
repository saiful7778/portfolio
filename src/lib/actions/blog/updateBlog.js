"use server";
import prisma from "../../../../prisma";

export default async function updateBlog(id, data) {
  try {
    const existBlog = await prisma.blog.findFirst({
      where: { id },
    });
    if (!existBlog) {
      throw new Error("No data available");
    }
    await prisma.blog.update({
      where: {
        id,
      },
      data: data,
    });
  } catch (err) {
    throw new Error(err);
  }
}
