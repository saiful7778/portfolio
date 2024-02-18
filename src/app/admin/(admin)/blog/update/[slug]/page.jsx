import ErrorDataShow from "@/components/ErrorDataShow";
import Link from "next/link";
import getBlog from "@/lib/DB/getBlog";
import UpdateBlogForm from "./UpdateBlogForm";

export async function generateMetadata({ params, searchParams }) {
  const res = await getBlog(params?.slug);
  if (!res.success) {
    return {
      title: "Error blog - admin - portfolio",
      description: "There was an error to get this project data",
    };
  }
  if (typeof searchParams.blogId === "undefined") {
    return {
      title: "blogId search params is unavailable",
      description: "There was an error to get this blog data",
    };
  }
  const { title } = res.data;
  return {
    title: `Update - ${title} - blog`,
    description: `This is "${title}" blog`,
  };
}

const UpdateBlog = async ({ params, searchParams }) => {
  const res = await getBlog(params?.slug);

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  if (typeof searchParams.blogId === "undefined") {
    return <ErrorDataShow error="blogId search params is unavailable" />;
  }

  return (
    <div className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <Link
        href={`/blog/${params?.slug}`}
        className="text-xl font-bold hover:text-blue-600 hover:underline"
        target="_blank"
      >
        Update: {res.data.title}
      </Link>
      <UpdateBlogForm blogData={{ id: searchParams.projectId, ...res.data }} />
    </div>
  );
};

export default UpdateBlog;
