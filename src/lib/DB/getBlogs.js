import prisma from "../../../prisma";

export default async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (err) {
    throw new Error(err);
  }
}
