import db from "@/lib/db";

export default async function getBlog(slug) {
  try {
    const blog = await db.blog.findFirst({
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
  }
}
