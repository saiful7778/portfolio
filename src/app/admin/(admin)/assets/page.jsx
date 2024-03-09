import EmptyData from "@/components/EmptyData";
import Image from "next/image";
import Actions from "./Actions";
import getAssets from "@/lib/data/getAssets";

const AssetsPage = async () => {
  const assets = await getAssets();

  if (assets.length < 1) {
    return <EmptyData />;
  }
  const renderAssets = assets.map((asset, idx) => (
    <figure
      className="group relative clear-both overflow-hidden"
      title={"alt: " + asset.alt}
      key={"asset" + idx}
    >
      <Image
        className="border border-gray-700"
        src={asset.url}
        alt={asset.alt}
        width={200}
        height={150}
      />
      <div
        className="invisible absolute inset-0 top-full flex h-full w-full flex-col items-end justify-end bg-gradient-to-b from-transparent to-gray-900 p-4 duration-300 group-hover:visible group-hover:top-0"
        title={"alt: " + asset.alt}
      >
        <Actions url={asset.url} id={asset.id} />
      </div>
    </figure>
  ));

  return <section className="flex flex-wrap gap-4">{renderAssets}</section>;
};

export default AssetsPage;
