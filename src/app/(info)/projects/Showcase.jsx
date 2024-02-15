import EmptyData from "@/components/EmptyData";
import ErrorDataShow from "@/components/ErrorDataShow";
import ProjectItem from "@/components/ProjectItem";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../../prisma";

async function getProjects() {
  try {
    await connectToDB();
    const projects = await prisma.project.findMany();
    if (!projects) {
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: projects,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}

const Showcase = async () => {
  const res = await getProjects();

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  const { data: projects } = res;

  const renderAllProjects = projects.map((project, idx) => {
    if (project.status === "published") {
      return <ProjectItem key={"project" + idx} projectData={project} />;
    }
  });

  if (projects.length < 1 && renderAllProjects.length < 1) {
    return <EmptyData />;
  }

  return (
    <div className="mx-auto mb-16 grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {renderAllProjects}
    </div>
  );
};

export default Showcase;
