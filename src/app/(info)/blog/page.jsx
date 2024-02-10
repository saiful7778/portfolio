import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "My Blog - Saiful Islam Portfolio",
  description: "This is blog page of Saiful Islam Portfolio website",
};

const Blog = () => {
  return (
    <>
      <SectionTitle title="My BLog" text="Explore my blog" blob={true} />
    </>
  );
};

export default Blog;
