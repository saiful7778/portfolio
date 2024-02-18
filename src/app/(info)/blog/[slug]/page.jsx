import ErrorDataShow from "@/components/ErrorDataShow";
import moment from "moment";
import Image from "next/image";
import parse from "html-react-parser";
import EmptyData from "@/components/EmptyData";
import getBlog from "@/lib/DB/getBlog";

export async function generateMetadata({ params }) {
  const res = await getBlog(params?.slug);
  if (!res.success) {
    return {
      title: "Error blog",
      description: "There was an error to get this blog data",
    };
  }
  const { title, status } = res.data;
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
}

const SingleBlog = async ({ params }) => {
  const res = await getBlog(params?.slug);

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  if (res.data.status === "private") {
    return <EmptyData />;
  }

  const {
    title,
    createdAt,
    des,
    thumbnail: { url, alt },
  } = res.data;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div className="mx-auto w-full space-y-4 md:w-4/5">
      <figure>
        <Image
          className="mx-auto"
          src={url}
          alt={alt}
          title={title}
          width={1080}
          height={720}
        />
      </figure>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Blog posted:</span> {timeAgo}
        </div>
      </div>
      <div className="paragraph">{parse(des)}</div>
    </div>
  );
};

export default SingleBlog;
