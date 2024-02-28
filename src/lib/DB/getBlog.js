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
      throw new Error("No data available");
    }
    return blog;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
