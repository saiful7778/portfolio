import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "About me - Saiful Islam Portfolio",
  description: "This is about me page of Saiful Islam portfolio website",
};

const AboutPage = () => {
  return (
    <>
      <SectionTitle
        title="About myself"
        text="Crafting Seamless Experiences, One Line of Code at a Time."
        blob={true}
      />
    </>
  );
};

export default AboutPage;
