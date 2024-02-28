// next.js package
import Image from "next/image";
// components
import Button from "@/components/utilities/Button";
import AutoType from "@/components/AutoType";
// assets
import bannerProfile from "../../../public/banner_profile.png";
import graphic01 from "../../../public/graphic-icons/Group 162527.png";
import graphic02 from "../../../public/graphic-icons/Vector 13.png";
import graphic03 from "../../../public/graphic-icons/Group 162526.png";
import graphic04 from "../../../public/graphic-icons/add.png";

const Banner = () => {
  return (
    <div className="relative mx-auto my-20 flex w-full flex-col items-center justify-between gap-4 md:w-4/5 lg:flex-row">
      <div className="absolute -left-96 top-0 z-0 h-[300px] w-[900px] rotate-45 rounded-full bg-blue-blob blur-[100px] filter"></div>
      <div className="relative z-[1] w-full lg:w-1/2">
        <h2 className="text-2xl uppercase tracking-widest">
          Hi, I{`'`}m Saiful Islam
        </h2>
        <h1 className="my-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          I Build Awesome
          <br /> website{`'`}s using <br />
          <AutoType />
        </h1>
        <p className="my-6 leading-6 text-gray-400">
          Experienced React.js developer, who build interactive web app for
          Business. Proficient in modern front-end technologies. with a
          commitment to solving complex programming. My main target is to build
          a business management web app.
        </p>
        <Button href="/projects" variant="primary-outline">
          View all Projects
        </Button>
      </div>
      <div className="relative z-[1] w-full lg:w-1/2">
        <div className="absolute left-0 top-0 z-10 animate-float">
          <Image
            className="select-none"
            src={graphic01}
            width={60}
            height={60}
            alt="graphic"
          />
        </div>
        <div className="absolute right-0 top-0 z-10 animate-rotate">
          <Image
            className="select-none"
            src={graphic02}
            width={60}
            height={60}
            alt="graphic"
          />
        </div>
        <Image
          className="select-none"
          src={bannerProfile}
          alt="banner profile image"
          width={526}
          height={564}
        />
        <div className="absolute bottom-0 left-0 z-10 animate-rotate">
          <Image
            className="select-none"
            src={graphic03}
            width={60}
            height={60}
            alt="graphic"
          />
        </div>
        <div className="absolute bottom-0 right-0 z-10 animate-float">
          <Image
            className="select-none"
            src={graphic04}
            width={60}
            height={60}
            alt="graphic"
          />
        </div>
      </div>
      <div className="absolute -right-96 top-28 z-0 h-[300px] w-[900px] -rotate-[20deg] rounded-full bg-red-blob blur-[100px] filter"></div>
    </div>
  );
};

export default Banner;
