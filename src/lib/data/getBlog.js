import db from "@/lib/db";

export async function getBlogBySlug(slug) {
  try {
    const blog = await db.blog.findFirst({
      where: {
        slug,
      },
    });
    if (!blog) {
      throw "No data available";
    }
    return blog;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getBlogById(id) {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      throw "No data available";
    }
    return blog;
  } catch (err) {
    throw new Error(err);
  }
}
