import Image from "next/image";
import Button from "./utilities/Button";

const BlogItem = ({ blogData }) => {
  const {
    thumbnail: { url, alt },
    title,
    slug,
  } = blogData;

  return (
    <div className="rounded-md border border-gray-700 bg-slate-900 p-4 shadow-md">
      <figure className="group relative clear-both h-fit w-full overflow-hidden rounded-md">
        <Image
          className="object-cover object-bottom"
          src={url}
          alt={alt}
          width={315}
          height={180}
        />
      </figure>
      <h3 className="mt-2 text-xl font-semibold capitalize">{title}</h3>
      <div className="flex items-center gap-2">
        <Button href={`/blog/${slug}`} variant="primary">
          View blog details
        </Button>
      </div>
    </div>
  );
};

export default BlogItem;
