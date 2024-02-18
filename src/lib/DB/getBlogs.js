import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getBlogs() {
  try {
    await connectToDB();
    const blogs = await prisma.blog.findMany();
    if (!blogs) {
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: blogs,
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
