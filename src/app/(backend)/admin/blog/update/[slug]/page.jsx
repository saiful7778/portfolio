import Link from "next/link";
import { getBlogById } from "@/lib/data/getBlog";
import UpdateBlogForm from "./UpdateBlogForm";

export async function generateMetadata({ searchParams }) {
  try {
    if (!searchParams?.blogId) {
      return {
        title: "`blogId` is unavailable",
        description: "There was an error because of `blogId` is unavailable",
      };
    }
    const blogData = await getBlogById(searchParams?.blogId);
    const { title } = blogData;
    return {
      title: `${title} - blog`,
      description: `This is "${title}" blog`,
    };
  } catch {
    return {
      title: "Error blog - admin - portfolio",
      description: "There was an error to get this blog data",
    };
  }
}

const UpdateBlog = async ({ searchParams }) => {
  if (!searchParams?.blogId) {
    throw "`blogId` is unavailable";
  }
  const blogData = await getBlogById(searchParams?.blogId);

  if (typeof searchParams.blogId === "undefined") {
    throw new Error("blogId search params is unavailable");
  }

  return (
    <section className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <Link
        href={`/blog/${blogData.slug}`}
        className="text-xl font-bold hover:text-blue-600 hover:underline"
        target="_blank"
      >
        Update: {blogData.title}
      </Link>
      <UpdateBlogForm blogData={{ id: searchParams.projectId, ...blogData }} />
    </section>
  );
};

export default UpdateBlog;
