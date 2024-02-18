"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function createBlog(blogData) {
  try {
    await connectToDB();
    const exist = await prisma.blog.findUnique({
      where: {
        slug: blogData.slug,
      },
    });
    if (exist) {
      return {
        success: false,
        message: "Blog is already exist",
      };
    }
    const data = await prisma.blog.create({
      data: blogData,
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
