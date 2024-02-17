import moment from "moment";
import Image from "next/image";
import parse from "html-react-parser";
import getProject from "@/lib/DB/getProject";
import ErrorDataShow from "@/components/ErrorDataShow";
import Button from "@/components/utilities/Button";
import DeleteProject from "./DeleteProject";

export async function generateMetadata({ params }) {
  const res = await getProject(params?.slug);
  if (!res.success) {
    return {
      title: "Error project - admin - portfolio",
      description: "There was an error to get this project data",
    };
  }
  const { title, shortDes } = res.data;
  return {
    title: `${title} - project`,
    description: shortDes,
  };
}

const SingleProject = async ({ params }) => {
  const res = await getProject(params?.slug);

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

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
  } = res.data;

  const timeAgo = moment(createdAt).fromNow();
  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  const projectCreateTime = moment(projectTime).format("Do MMM YY");

  return (
    <div className="mx-auto w-4/5 space-y-4">
      <figure>
        <Image
          className="mx-auto"
          src={url}
          alt={alt}
          title={title}
          width={1080}
          height={720}
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
        <DeleteProject projectId={id} />
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
      <div className="paragraph">
        <div className="text-sm text-gray-500">Description:</div>
        {parse(des)}
      </div>
    </div>
  );
};

export default SingleProject;
