import SectionElement from "@/components/SectionElement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Saiful Islam - Portfolio",
  description:
    "This is contact page of Saiful Islam personal portfolio website.",
};

const Contact: React.FC = () => {
  return (
    <SectionElement title="Contact me" text="Let's talk" blob>
      Contact
    </SectionElement>
  );
};

export default Contact;
