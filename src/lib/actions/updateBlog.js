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
      return {
        success: false,
        message: "No data available",
      };
    }

    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: data,
    });
    return {
      success: true,
      data: blog,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}
