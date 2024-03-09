import { getProjectById } from "@/lib/data/getProject";
import UpdateProjectForm from "./UpdateProjectForm";
import Link from "next/link";

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

const UpdateProject = async ({ searchParams }) => {
  if (!searchParams?.projectId) {
    throw "`projectId` is unavailable";
  }
  const projectData = await getProjectById(searchParams?.projectId);

  return (
    <section className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
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
    </section>
  );
};

export default UpdateProject;
