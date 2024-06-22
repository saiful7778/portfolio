import Hierarchy from "@/components/sections/Hierarchy";
import Banner from "@/components/shared/Banner";
import { FC } from "react";

const Home: FC = async () => {
  return (
    <>
      <Banner />
      <Hierarchy />
    </>
  );
};

export default Home;
