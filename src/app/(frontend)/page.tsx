import Hierarchy from "@/components/sections/Hierarchy";
import Banner from "@/components/shared/Banner";
import getHiererchyData from "@/lib/serverData/getHiererchyData";
import { FC } from "react";

const Home: FC = async () => {
  const appDirData = await getHiererchyData();

  return (
    <>
      <Banner />
      <Hierarchy hiererchyData={appDirData} />
    </>
  );
};

export default Home;
