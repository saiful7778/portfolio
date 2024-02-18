import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blogData }) => {
  const {
    thumbnail: { url, alt },
    title,
    slug,
    createdAt,
  } = blogData;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <div className="rounded-md border border-gray-700 bg-slate-900 p-4 shadow-md">
      <figure className="relative mb-2 h-fit w-full overflow-hidden rounded-md">
        <Image
          className="object-cover object-bottom"
          src={url}
          alt={alt}
          width={315}
          height={180}
        />
      </figure>
      <Link
        href={`/blog/${slug}`}
        className="text-xl font-semibold capitalize hover:text-blue-600 hover:underline"
      >
        {title}
      </Link>
      <div className="text-xs">
        <span className="text-gray-500">Blog posted:</span> {timeAgo}
      </div>
    </div>
  );
};

export default BlogItem;
