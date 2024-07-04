import Hierarchy from "@/components/sections/Hierarchy";
import Skills from "@/components/sections/Skills";
import Banner from "@/components/shared/Banner";
import { FC } from "react";

const Home: FC = async () => {
  return (
    <>
      <Banner />
      <Skills />
      <Hierarchy />
    </>
  );
};

export default Home;
