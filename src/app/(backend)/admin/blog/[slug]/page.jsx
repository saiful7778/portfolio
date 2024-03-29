import { getBlogById } from "@/lib/data/getBlog";
import moment from "moment";
import Image from "next/image";
import Button from "@/components/utilities/Button";
import DeleteBlog from "./DeleteBlog";
import renderReactComponent from "@/lib/renderReactComponent";

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

const SingleBlog = async ({ searchParams }) => {
  if (!searchParams?.blogId) {
    throw "`blogId` is unavailable";
  }
  const blogData = await getBlogById(searchParams?.blogId);

  const {
    id,
    title,
    createdAt,
    updatedAt,
    slug,
    des,
    thumbnail: { url, alt },
  } = blogData;

  const timeAgo = moment(createdAt).fromNow();
  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");

  return (
    <article className="mx-auto w-full max-w-4xl space-y-4">
      <figure>
        <Image
          className="mx-auto"
          src={url}
          alt={alt}
          title={title}
          width={896}
          height={504}
        />
        <p className="text-xs italic text-gray-500">Alt text: {alt}</p>
      </figure>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <Button
          href={{
            pathname: `/admin/blog/update/${slug}`,
            query: { blogId: id },
          }}
          variant="confirm"
        >
          Update
        </Button>
        <DeleteBlog blogId={id} thumbnail={url} />
        <Button variant="primary" href={`/blog/${slug}`}>
          Live link
        </Button>
      </div>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Time ago:</span> {timeAgo}
        </div>
        <div>
          <span className="text-gray-500">Create:</span> {createdTime}
        </div>
        <div>
          <span className="text-gray-500">Update:</span> {updatedTime}
        </div>
      </div>
      <section>
        <div className="text-sm text-gray-500">Description:</div>
        {renderReactComponent(des)}
      </section>
    </article>
  );
};

export default SingleBlog;
