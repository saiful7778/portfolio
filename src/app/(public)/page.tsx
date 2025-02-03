import Image from "next/image";
import React from "react";
import bannerImage from "@/assets/images/banner-bg.png";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <Image
          className="absolute left-0 top-0 -z-[1] h-full w-full"
          src={bannerImage}
          alt="banner image"
        />
      </div>
    </>
  );
};

export default HomePage;
