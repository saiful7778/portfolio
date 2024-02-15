import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Button from "./utilities/Button";

const ProjectItem = ({ projectData }) => {
  const {
    thumbnail: { url, alt },
    title,
    slug,
    shortDes,
    liveLink,
  } = projectData;

  return (
    <div className="rounded-md border border-gray-700 bg-slate-900 p-4 shadow-md">
      <figure className="group relative clear-both h-52 w-full overflow-hidden rounded-md">
        <Image
          className="object-cover object-bottom"
          src={url}
          alt={alt}
          width={320}
          height={200}
        />
        <div className="invisible absolute inset-0 top-full flex h-full w-full flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 p-4 duration-300 group-hover:visible group-hover:top-0">
          <Link
            className="link flex w-fit items-center gap-2"
            href={liveLink}
            target="_blank"
          >
            Live view
            <FaArrowUpRightFromSquare />
          </Link>
        </div>
      </figure>
      <h3 className="mt-2 text-xl font-semibold capitalize">{title}</h3>
      <p className="mb-2 mt-1 text-sm text-gray-400">{shortDes}</p>
      <Button href={`/project/${slug}`} variant="primary">
        View project details
      </Button>
    </div>
  );
};

export default ProjectItem;
