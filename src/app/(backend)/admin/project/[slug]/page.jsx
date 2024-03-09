import moment from "moment";
import Image from "next/image";
import { getProjectById } from "@/lib/data/getProject";
import Button from "@/components/utilities/Button";
import DeleteProject from "./DeleteProject";
import renderReactComponent from "@/lib/renderReactComponent";

export async function generateMetadata({ searchParams }) {
  try {
    if (!searchParams?.projectId) {
      return {
        title: "`projectId` is unavailable",
        description: "There was an error because of `projectId` is unavailable",
      };
    }
    const projectData = await getProjectById(searchParams?.projectId);
    const { title, shortDes } = projectData;
    return {
      title: `${title} - project`,
      description: shortDes,
    };
  } catch {
    return {
      title: "Error project - admin - portfolio",
      description: "There was an error to get this project data",
    };
  }
}

const SingleProject = async ({ searchParams }) => {
  if (!searchParams?.projectId) {
    throw "`projectId` is unavailable";
  }
  const projectData = await getProjectById(searchParams?.projectId);

  const {
    id,
    title,
    createdAt,
    updatedAt,
    slug,
    projectTime,
    shortDes,
    thumbnail: { url, alt },
    des,
  } = projectData;

  const timeAgo = moment(createdAt).fromNow();
  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  const projectCreateTime = moment(projectTime).format("Do MMM YY");

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
            pathname: `/admin/project/update/${slug}`,
            query: { projectId: id },
          }}
          variant="confirm"
        >
          Update
        </Button>
        <DeleteProject projectId={id} thumbnail={url} />
        <Button variant="primary" href={`/project/${slug}`}>
          Live link
        </Button>
      </div>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Project created time:</span>{" "}
          {projectCreateTime}
        </div>
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
      <div>
        <div className="text-sm text-gray-500">Short description:</div>
        <p>{shortDes}</p>
      </div>
      <section>
        <div className="text-sm text-gray-500">Description:</div>
        {renderReactComponent(des)}
      </section>
    </article>
  );
};

export default SingleProject;
