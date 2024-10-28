import SectionElement from "@/components/SectionElement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - Saiful Islam - Portfolio",
  description: "This is blogs page of Saiful Islam personal portfolio website.",
};

const Blogs: React.FC = () => {
  return (
    <SectionElement title="Blogs" text="Learn new things" blob>
      Blogs
    </SectionElement>
  );
};

export default Blogs;
