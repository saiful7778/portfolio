import AddProjectForm from "./AddProjectForm";

export const metadata = {
  title: "Add new Project - admin - portfolio",
  description:
    "This is add new project page of Saiful Islam portfolio website.",
};

const AddProject = () => {
  return (
    <div className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <h2 className="mb-2 text-xl font-bold">Add new project</h2>
      <AddProjectForm />
    </div>
  );
};

export default AddProject;
