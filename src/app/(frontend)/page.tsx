import Hierarchy from "@/components/sections/Hierarchy";
import Banner from "@/components/shared/Banner";
import getHierarchyData from "@/lib/getHierarchyData";

export default function Home() {
  const appDirData = getHierarchyData();

  return (
    <>
      <Banner />
      <Hierarchy hiererchyData={appDirData} />
    </>
  );
}
