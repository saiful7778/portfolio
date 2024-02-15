import ErrorDataShow from "@/components/ErrorDataShow";
import getProject from "@/lib/DB/getProject";
import moment from "moment";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";

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
    title,
    projectTime,
    createdAt,
    thumbnail: { url, alt },
    githubLink,
    liveLink,
    des,
  } = res.data;

  const projectCreateTime = moment(projectTime).format("Do MMM YY");
  const timeAgo = moment(createdAt).fromNow();

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
      </figure>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="text-sm">
        <div>
          <span className="text-gray-500">Project posted:</span> {timeAgo}
        </div>
        <div>
          <span className="text-gray-500">Project created time:</span>{" "}
          {projectCreateTime}
        </div>
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
      <div className="paragraph">{parse(des)}</div>
    </div>
  );
};

export default SingleProject;
