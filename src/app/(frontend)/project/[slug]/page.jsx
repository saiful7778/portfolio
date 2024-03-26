import { getProjectBySlug } from "@/lib/data/getProject";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import EmptyData from "@/components/EmptyData";
import renderReactComponent from "@/lib/renderReactComponent";

export async function generateMetadata({ params }) {
  try {
    const projectData = await getProjectBySlug(params?.slug);
    const { title, shortDes, status } = projectData;
    if (status === "private") {
      return {
        title: "There was no available",
        description: "There was no available.",
      };
    }
    return {
      title: `${title} - project`,
      description: shortDes,
    };
  } catch {
    return {
      title: "Error project",
      description: "There was an error to get this project data",
    };
  }
}

const SingleProject = async ({ params }) => {
  const projectData = await getProjectBySlug(params?.slug);

  if (projectData.status === "private") {
    return <EmptyData />;
  }

  const {
    title,
    projectTime,
    createdAt,
    thumbnail: { url, alt },
    githubLink,
    liveLink,
    technologies,
    des,
  } = projectData;

  const projectCreateTime = moment(projectTime).format("Do MMM YY");
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
          <span className="text-gray-500">Project posted:</span> {timeAgo}
        </div>
        <div>
          <span className="text-gray-500">Project created time:</span>{" "}
          {projectCreateTime}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1 text-sm">
        <span className="text-gray-500">Technologies:</span>
        {technologies?.map((ele, idx) => (
          <span
            key={`technology_${idx}`}
            className="select-none rounded-md border border-gray-700 px-1"
          >
            {ele}
          </span>
        ))}
      </div>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Github link:</span>{" "}
          <Link className="link" href={githubLink} target="_blank">
            {githubLink}
          </Link>
        </div>
        <div>
          <span className="text-gray-500">Project live link:</span>{" "}
          <Link className="link" href={liveLink} target="_blank">
            {liveLink}
          </Link>
        </div>
      </div>
      <section>{renderReactComponent(des)}</section>
    </article>
  );
};

export default SingleProject;
