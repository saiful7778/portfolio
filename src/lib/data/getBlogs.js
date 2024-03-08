import db from "@/lib/db";

export default async function getBlogs() {
  try {
    const blogs = await db.blog.findMany();
    return blogs;
  } catch (err) {
    throw new Error(err);
  }
}
