import React from "react";
import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Graphic01 from "@/components/graphics/Graphic-01";
import Graphic02 from "@/components/graphics/Graphic-02";
import Graphic03 from "@/components/graphics/Graphic-03";
import Graphic04 from "@/components/graphics/Graphic-04";
import TypingAnimation from "@/components/TypingAnimation";
import bannerProfile from "@/assets/banner_profile.png";
import {
  DestructiveColorBlob,
  PrimaryColorBlob,
} from "@/components/GradientBlob";

const Banner: React.FC = () => {
  return (
    <section className="relative h-[calc(100vh-120px)] flex flex-col items-center justify-between gap-20 lg:flex-row">
      <PrimaryColorBlob className="-left-96 top-0" />
      <DestructiveColorBlob className="-right-96 top-28" />
      <div className="z-[1] w-full lg:w-1/2">
        <h2 className="text-2xl uppercase tracking-widest">
          Hi, I{`'`}m Saiful Islam
        </h2>
        <h1 className="my-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          I Build Awesome
          <br />
          website{`'`}s using
          <br />
          <TypingAnimation />
        </h1>
        <p className="my-6 text-base leading-6 text-muted-foreground">
          Experienced React.js developer, who build interactive web app for
          Business. Proficient in modern front-end technologies. with a
          commitment to solving complex programming. My main target is to build
          a business management web app.
        </p>
        <Button size="lg" asChild>
          <Link href="/projects">View all Projects</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          {/* <Link href={resume} download={true}>
            Download my Resume
          </Link> */}
        </Button>
      </div>
      <div className="relative z-[1] w-full lg:w-1/2">
        <span className="absolute left-0 top-0 z-10 animate-rotate-scale">
          <Graphic01 />
        </span>
        <span className="absolute right-0 top-0 z-10 animate-float">
          <Graphic02 />
        </span>
        <Image
          className="mx-auto select-none"
          src={bannerProfile}
          alt="banner profile image"
          width={500}
          height={537}
        />
        <span className="absolute bottom-0 left-0 z-10 animate-flick">
          <Graphic03 />
        </span>
        <span className="absolute bottom-0 right-0 z-10">
          <Graphic04 />
        </span>
      </div>
    </section>
  );
};

export default Banner;
