import ErrorDataShow from "@/components/ErrorDataShow";
import getProject from "@/lib/DB/getProject";
import UpdateProjectForm from "./UpdateProjectForm";

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
    title: `Update - ${title} - project`,
    description: shortDes,
  };
}

const UpdateProject = async ({ params, searchParams }) => {
  const res = await getProject(params?.slug);

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }
  return (
    <div className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <h2 className="mb-2 text-xl font-bold">Update: {res.data.title}</h2>
      <UpdateProjectForm
        projectData={{ id: searchParams.projectId, ...res.data }}
      />
    </div>
  );
};

export default UpdateProject;
