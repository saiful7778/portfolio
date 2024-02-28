"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function updateBlog(id, data) {
  try {
    await connectToDB();
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
  } finally {
    await prisma.$disconnect();
  }
}
