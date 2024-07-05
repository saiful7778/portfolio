import ProjectForm from "@/components/form/ProjectForm";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Add new Project - admin - portfolio",
  description:
    "This is add new project page of Saiful Islam portfolio website.",
};

const ProjectAdd: FC = () => {
  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Add new project</h2>
      <ProjectForm />
    </>
  );
};

export default ProjectAdd;
