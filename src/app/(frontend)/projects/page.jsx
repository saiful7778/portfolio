import SectionTitle from "@/components/SectionTitle";
import Showcase from "./Showcase";

export const metadata = {
  title: "My Projects - Saiful Islam Portfolio",
  description: "This is the project page of Saiful Islam Portfolio website.",
};

const ProjectsPage = async () => {
  return (
    <>
      <SectionTitle
        title="My Projects"
        text="Explore my projects"
        blob={true}
      />
      <Showcase />
    </>
  );
};

export default ProjectsPage;
