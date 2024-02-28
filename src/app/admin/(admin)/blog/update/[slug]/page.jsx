import Link from "next/link";
import getBlog from "@/lib/DB/getBlog";
import UpdateBlogForm from "./UpdateBlogForm";

export async function generateMetadata({ params, searchParams }) {
  try {
    if (typeof searchParams.blogId === "undefined") {
      return {
        title: "blogId search params is unavailable",
        description: "There was an error to get this blog data",
      };
    }
    const blogData = await getBlog(params?.slug);
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

const UpdateBlog = async ({ params, searchParams }) => {
  const blogData = await getBlog(params?.slug);

  if (typeof searchParams.blogId === "undefined") {
    throw new Error("blogId search params is unavailable");
  }

  return (
    <div className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <Link
        href={`/blog/${blogData.slug}`}
        className="text-xl font-bold hover:text-blue-600 hover:underline"
        target="_blank"
      >
        Update: {blogData.title}
      </Link>
      <UpdateBlogForm blogData={{ id: searchParams.projectId, ...blogData }} />
    </div>
  );
};

export default UpdateBlog;
