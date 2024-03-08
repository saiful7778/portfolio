// next.js package
import Image from "next/image";
// components
import Button from "@/components/utilities/Button";
import AutoType from "@/components/AutoType";
// assets
import bannerProfile from "../../../public/banner_profile.png";
import Graphic01 from "@/components/graphics/Graphic-01";
import Graphic02 from "@/components/graphics/Graphic-02";
import Graphic03 from "@/components/graphics/Graphic-03";
import Graphic04 from "@/components/graphics/Graphic-04";
import Reval from "@/components/Reval";

const Banner = () => {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-20 p-2 lg:flex-row">
      <div className="absolute -left-96 top-0 z-0 h-[300px] w-[900px] rotate-45 rounded-full bg-blue-blob blur-[100px] filter"></div>
      <div className="relative z-[1] w-full lg:w-1/2">
        <Reval>
          <h2 className="text-2xl uppercase tracking-widest">
            Hi, I{`'`}m Saiful Islam
          </h2>
        </Reval>
        <Reval>
          <h1 className="my-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <Reval>I Build Awesome</Reval>
            <Reval>
              website{`'`}s using
              <br />
            </Reval>
            <Reval>
              <AutoType />
            </Reval>
          </h1>
        </Reval>
        <Reval>
          <p className="my-6 text-base leading-6 text-gray-400">
            Experienced React.js developer, who build interactive web app for
            Business. Proficient in modern front-end technologies. with a
            commitment to solving complex programming. My main target is to
            build a business management web app.
          </p>
        </Reval>
        <Button href="/projects" variant="primary-outline" size="lg">
          View all Projects
        </Button>
      </div>
      <div className="relative z-[1] w-full lg:w-1/2">
        <div className="absolute left-0 top-0 z-10">
          <Graphic01 />
        </div>
        <div className="absolute right-0 top-0 z-10">
          <Graphic02 />
        </div>
        <Image
          className="mx-auto select-none"
          src={bannerProfile}
          alt="banner profile image"
          width={500}
          height={537}
        />
        <div className="absolute bottom-0 left-0 z-10">
          <Graphic03 />
        </div>
        <div className="absolute bottom-0 right-0 z-10">
          <Graphic04 />
        </div>
      </div>
      <div className="absolute -right-96 top-28 z-0 h-[300px] w-[900px] -rotate-[20deg] rounded-full bg-red-blob blur-[100px] filter"></div>
    </section>
  );
};

export default Banner;
