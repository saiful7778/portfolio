import EmptyData from "@/components/EmptyData";
import ProjectItem from "@/components/ProjectItem";
import getProjects from "@/lib/data/getProjects";

const Showcase = async () => {
  const projects = await getProjects();

  if (projects.length < 1) {
    return <EmptyData />;
  }

  const allProject = [];
  for (let x of projects) {
    if (x.status === "published") {
      allProject.push(x);
    }
  }
  const renderAllProjects = allProject.map((project, idx) => {
    if (project.status === "published") {
      return <ProjectItem key={"project" + idx} projectData={project} />;
    }
  });

  if (renderAllProjects.length < 1) {
    return <EmptyData />;
  }

  return (
    <div className="mx-auto mb-16 grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {renderAllProjects}
    </div>
  );
};

export default Showcase;
