import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getBlog(slug) {
  try {
    await connectToDB();
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
      },
    });
    if (!blog) {
      return {
        success: false,
        message: "No data available",
      };
    }
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
