import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function getBlogs() {
  try {
    await connectToDB();
    const blogs = await prisma.blog.findMany();
    if (!blogs) {
      throw new Error("No data available");
    }
    return blogs;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
