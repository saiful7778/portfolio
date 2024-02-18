"use server";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../prisma";

export default async function deleteBlog(id) {
  try {
    await connectToDB();
    const exitBlog = await prisma.blog.findFirst({
      where: { id },
    });
    if (!exitBlog) {
      return {
        success: false,
        message: "Blog doesn't exit",
      };
    }
    const data = await prisma.blog.delete({
      where: { id },
    });
    return {
      success: true,
      data,
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
