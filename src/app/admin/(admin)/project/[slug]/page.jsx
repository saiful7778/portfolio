import { connectToDB } from "@/lib/server-helper";
import moment from "moment";
import prisma from "../../../../../../prisma";
import Image from "next/image";
import parse from "html-react-parser";

async function getProject(slug) {
  try {
    await connectToDB();
    const project = await prisma.project.findFirst({
      where: {
        slug,
      },
    });
    if (!project) {
      throw new Error("This project not available.");
    }
    return project;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function generateMetadata({ params }) {
  const projectData = await getProject(params?.slug);
  const { title, shortDes } = projectData;
  return {
    title: `${title} - project`,
    description: shortDes,
  };
}

const SingleProject = async ({ params }) => {
  const projectData = await getProject(params?.slug);
  const {
    title,
    createdAt,
    updatedAt,
    projectTime,
    shortDes,
    thumbnail: { url, alt },
    des,
  } = projectData;

  const timeAgo = moment(createdAt).fromNow();
  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  const projectCreateTime = moment(projectTime).format("Do MMM YY, h:mm a");

  return (
    <div className="mx-auto w-4/5 space-y-4">
      <figure>
        <Image
          className="mx-auto"
          src={url}
          alt={alt}
          width={1080}
          height={720}
        />
        <p className="text-xs italic text-gray-500">Alt text: {alt}</p>
      </figure>
      <h1 className="text-3xl font-bold">{title}</h1>
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
      <div>
        <div className="text-sm text-gray-500">Description:</div>
        {parse(des)}
      </div>
    </div>
  );
};

export default SingleProject;
