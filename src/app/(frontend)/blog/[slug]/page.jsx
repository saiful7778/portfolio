import moment from "moment";
import Image from "next/image";
import EmptyData from "@/components/EmptyData";
import { getBlogBySlug } from "@/lib/data/getBlog";
import renderReactComponent from "@/lib/renderReactComponent";

export async function generateMetadata({ params }) {
  try {
    const blogData = await getBlogBySlug(params?.slug);
    const { title, status } = blogData;
    if (status === "private") {
      return {
        title: "There was no available",
        description: "There was no available.",
      };
    }
    return {
      title: `${title} - blog`,
      description: `This is "${title}" blog`,
    };
  } catch {
    return {
      title: "Error blog",
      description: "There was an error to get this blog data",
    };
  }
}

const SingleBlog = async ({ params }) => {
  const blogData = await getBlogBySlug(params?.slug);

  if (blogData.status === "private") {
    return <EmptyData />;
  }

  const {
    title,
    createdAt,
    des,
    thumbnail: { url, alt },
  } = blogData;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <article className="mx-auto mb-10 mt-4 w-full max-w-xl space-y-4 lg:max-w-4xl">
      <figure className="relative">
        <div className="absolute -left-96 top-0 z-0 h-[200px] w-[500px] rotate-45 rounded-full bg-blue-blob blur-[80px] filter"></div>
        <div className="absolute -left-96 bottom-0 z-0 h-[200px] w-[500px] -rotate-45 rounded-full bg-red-blob blur-[80px] filter"></div>
        <Image
          className="relative z-[1] mx-auto shadow"
          src={url}
          alt={alt}
          title={title}
          width={896}
          height={504}
        />
        <div className="absolute -right-96 top-0 z-0 h-[200px] w-[500px] -rotate-45 rounded-full bg-red-blob blur-[80px] filter"></div>
        <div className="absolute -right-96 bottom-0 z-0 h-[200px] w-[500px] rotate-45 rounded-full  bg-blue-blob blur-[80px] filter"></div>
      </figure>
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Posted:</span> {timeAgo}
        </div>
      </div>
      <section>{renderReactComponent(des)}</section>
    </article>
  );
};

export default SingleBlog;
