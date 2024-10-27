import SectionElement from "@/components/SectionElement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects - Saiful Islam - Portfolio",
  description:
    "This is project showcase page of Saiful Islam personal portfolio website.",
};

const Project: React.FC = () => {
  return (
    <SectionElement
      title="My Projects"
      text="Explore all of my amazing projects"
      blob
    >
      Project
    </SectionElement>
  );
};

export default Project;
