import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Contact me - Saiful Islam Portfolio",
  description: "This is contact page of Saiful Islam Portfolio website",
};

const Blog = () => {
  return (
    <>
      <SectionTitle
        title="Contact me"
        text="Fill free to say anything"
        blob={true}
      />
    </>
  );
};

export default Blog;
