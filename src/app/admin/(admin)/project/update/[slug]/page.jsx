import getProject from "@/lib/DB/getProject";
import UpdateProjectForm from "./UpdateProjectForm";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }) {
  try {
    if (typeof searchParams.projectId === "undefined") {
      return {
        title: "projectId search params is unavailable",
        description: "There was an error to get this project data",
      };
    }
    const projectData = await getProject(params?.slug);
    const { title, shortDes } = projectData;
    return {
      title: `Update - ${title} - project`,
      description: shortDes,
    };
  } catch {
    return {
      title: "Error project - admin - portfolio",
      description: "There was an error to get this project data",
    };
  }
}

const UpdateProject = async ({ params, searchParams }) => {
  const projectData = await getProject(params?.slug);

  if (typeof searchParams.projectId === "undefined") {
    throw new Error("projectId search params is unavailable");
  }

  return (
    <div className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <Link
        href={`/project/${projectData.slug}`}
        className="text-xl font-bold hover:text-blue-600 hover:underline"
        target="_blank"
      >
        Update: {projectData.title}
      </Link>
      <UpdateProjectForm
        projectData={{ id: searchParams.projectId, ...projectData }}
      />
    </div>
  );
};

export default UpdateProject;
