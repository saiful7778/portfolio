import SectionTitle from "@/components/SectionTitle";
// import ProjectItem from "@/components/projects/ProjectItem";
// import EmptyData from "@/components/EmptyData";
// import { readAll } from "@/lib/CURD/read";

export const metadata = {
  title: "My Projects - Saiful Islam Portfolio",
  description: "This is the project page of Saiful Islam Portfolio website.",
};

const ProjectsPage = async () => {
  // const allProjects = await readAll("projects");

  // const renderAllProjects = allProjects.map((project, idx) => {
  //   if (project.status === "published") {
  //     return <ProjectItem key={"project" + idx} projectData={project} />;
  //   }
  // });
  return (
    <>
      <SectionTitle
        title="My Projects"
        text="Explore my projects"
        blob={true}
      />
      {/* {renderAllProjects.length > 0 ? (
        <div className="mx-auto mb-16 grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {renderAllProjects}
        </div>
      ) : (
        <EmptyData />
      )} */}
    </>
  );
};

export default ProjectsPage;
