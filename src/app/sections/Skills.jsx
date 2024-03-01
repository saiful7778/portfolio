"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import gitLogo from "../../../public/graphic-icons/git.png";
import nodeLogo from "../../../public/graphic-icons/node.png";
import htmlLogo from "../../../public/graphic-icons/html.png";
import cssLogo from "../../../public/graphic-icons/css.png";
import nextjsLogo from "../../../public/graphic-icons/nextjs.png";
import githubLogo from "../../../public/graphic-icons/github.png";
import reactRouterLogo from "../../../public/graphic-icons/react-router.png";
import reduxLogo from "../../../public/graphic-icons/redux.png";
import jsLogo from "../../../public/graphic-icons/javascript.png";
import reactLogo from "../../../public/graphic-icons/react.png";
import tenstackQueryLogo from "../../../public/graphic-icons/tenstack-query.png";
import stripeLogo from "../../../public/graphic-icons/stripe.png";
import sassLogo from "../../../public/graphic-icons/sass.png";
import jwtLogo from "../../../public/graphic-icons/jwt.png";
import firebaseLogo from "../../../public/graphic-icons/firebase.png";
import tailwindcssLogo from "../../../public/graphic-icons/tailwindcss.png";
import mongodbLogo from "../../../public/graphic-icons/mongodb.png";
import reCaptchaLogo from "../../../public/graphic-icons/RecaptchaLogo.png";

const data = [
  {
    image: { width: 30, height: 30, src: gitLogo, alt: "git logo" },
    animate: { x: -500, y: -500, rotate: -50 },
    details: {
      title: "Git",
      description:
        "Git is a distributed version control system that tracks changes in any set of computer files.",
    },
  },
  {
    image: { width: 70, height: 70, src: nodeLogo, alt: "node logo" },
    animate: { x: -400, y: -400, rotate: -40 },
    details: {
      title: "Node",
      description:
        "Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more.",
    },
  },
  {
    image: { width: 80, height: 80, src: htmlLogo, alt: "html logo" },
    animate: { x: -300, y: -300, rotate: -30 },
    details: {
      title: "HTML - Hyper Text Markup Language",
      description:
        "HTML is the standard markup language for creating Web pages.",
    },
  },
  {
    image: { width: 80, height: 80, src: cssLogo, alt: "css logo" },
    animate: { x: 300, y: -300, rotate: 30 },
    details: {
      title: "CSS - Cascading Style Sheets",
      description:
        "Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML.",
    },
  },
  {
    image: { width: 70, height: 70, src: nextjsLogo, alt: "next.js logo" },
    animate: { x: 400, y: -400, rotate: 40 },
    details: {
      title: "Next.js",
      description:
        "Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static website generation.",
    },
  },
  {
    image: { width: 30, height: 30, src: githubLogo, alt: "github logo" },
    animate: { x: 500, y: -500, rotate: 50 },
    details: {
      title: "Github",
      description:
        "GitHub is an online software development platform. It's used for storing, tracking, and collaborating on software projects.",
    },
  },
  {
    image: {
      width: 70,
      height: 70,
      src: reactRouterLogo,
      alt: "react router logo",
    },
    animate: { x: -500, y: -100, rotate: -50 },
    details: {
      title: "React router",
      description:
        "React Router is a JavaScript framework that lets us handle client and server-side routing in React applications. It enables the creation of single-page web or mobile apps that allow navigating without refreshing the page.",
    },
  },
  {
    image: { width: 70, height: 70, src: reduxLogo, alt: "redux logo" },
    animate: { x: -400, y: 100, rotate: -40 },
    details: {
      title: "Redux",
      description:
        "Redux is an open-source JavaScript library for managing and centralizing application state.",
    },
  },
  {
    image: { width: 110, height: 110, src: jsLogo, alt: "javascript logo" },
    animate: { x: -300, y: 0, rotate: -30 },
    details: {
      title: "Javascript",
      description:
        "JavaScript often abbreviated as JS, is a programming language and core technology of the World Wide Web, alongside HTML and CSS.",
    },
  },
  {
    image: { width: 125, height: 125, src: reactLogo, alt: "react.js logo" },
    animate: { x: 400, y: 0, rotate: 30 },
    details: {
      title: "React",
      description:
        "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta.",
    },
  },
  {
    image: {
      width: 70,
      height: 70,
      src: tenstackQueryLogo,
      alt: "tenstack query logo",
    },
    animate: { x: 500, y: 0, rotate: 40 },
    details: {
      title: "Tenstack query",
      description:
        "Tenstack query is a declarative dependency on an asynchronous source of data that is tied to a unique key.",
    },
  },
  {
    image: { width: 70, height: 70, src: stripeLogo, alt: "Stripe logo" },
    animate: { x: 500, y: 0, rotate: 50 },
    details: {
      title: "Stripe",
      description:
        "Stripe powers online and in-person payment processing and financial solutions for businesses of all sizes.",
    },
  },
  {
    image: { width: 30, height: 30, src: sassLogo, alt: "sass logo" },
    animate: { x: -500, y: 500, rotate: -50 },
    details: {
      title: "Sass",
      description:
        "Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.",
    },
  },
  {
    image: { width: 50, height: 50, src: jwtLogo, alt: "jwt logo" },
    animate: { x: -400, y: 400, rotate: -40 },
    details: {
      title: "JWT - Json Web Token",
      description:
        "JSON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims.",
    },
  },
  {
    image: { width: 60, height: 60, src: firebaseLogo, alt: "firebase logo" },
    animate: { x: -300, y: 300, rotate: -30 },
    details: {
      title: "Firebase",
      description: "Firebase is a complate backend service and authentication.",
    },
  },
  {
    image: {
      width: 100,
      height: 100,
      src: tailwindcssLogo,
      alt: "tailwindcss logo",
    },
    animate: { x: 300, y: 300, rotate: 30 },
    details: {
      title: "Tailwind CSS",
      description:
        "Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap.",
    },
  },
  {
    image: { width: 50, height: 50, src: mongodbLogo, alt: "mongodb logo" },
    animate: { x: 400, y: 400, rotate: 40 },
    details: {
      title: "MongoDB",
      description:
        "MongoDB is a source-available, cross-platform, document-oriented database program.",
    },
  },
  {
    image: { width: 30, height: 30, src: reCaptchaLogo, alt: "reCaptcha logo" },
    animate: { x: 500, y: 500, rotate: 50 },
    details: {
      title: "Google reCaptcha",
      description:
        "reCAPTCHA is a free service from Google that helps protect websites from spam and abuse. A “CAPTCHA” is a turing test to tell human and bots apart.",
    },
  },
];

const style = {
  first: "m-1 flex items-end justify-center gap-1 md:m-4 md:gap-4",
  second: "m-1 flex items-center justify-center gap-1 md:m-4 md:gap-4",
  third: "m-1 flex items-start justify-center gap-1 md:m-4 md:gap-4",
};

const Skills = () => {
  const [selected, setSelected] = useState(null);

  const renderSection = data.map((ele, idx) => (
    <Fragment key={`skit${idx}`}>
      <SkillItem
        id={`skit${idx}`}
        onClick={() =>
          setSelected({
            details: ele.details,
            image: ele.image,
            id: `skit${idx}`,
          })
        }
        animate={ele.animate}
        image={ele.image}
        details={ele.details}
      />
    </Fragment>
  ));

  return (
    <>
      <SectionTitle
        title="My Skills"
        text="my all outstanding skills."
        blob={true}
      />
      <section className="relative mx-auto mb-16 w-fit">
        <div className="absolute right-0 top-0 h-48 w-48 bg-amber-500/20 blur-3xl filter"></div>
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-sky-700/40 blur-3xl filter"></div>
        <div className="absolute bottom-0 left-0 h-36 w-36 bg-red-600/50 blur-3xl filter"></div>
        {/* skill item section */}
        <div className={style.first}>{renderSection.slice(0, 6)}</div>
        <div className={style.second}>
          <div className="flex flex-col items-end gap-1 md:gap-4">
            {renderSection.slice(6, 8)}
          </div>
          {renderSection.slice(8, 10)}
          <div className="flex flex-col items-start gap-1 md:gap-4">
            {renderSection.slice(10, 12)}
          </div>
        </div>
        <div className={style.third}>
          {renderSection.slice(12, renderSection.length)}
        </div>
        <AnimatePresence>
          {selected && (
            <div
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[110] flex h-screen w-full items-center justify-center bg-gray-900/70 text-white"
            >
              <motion.div
                layoutId={selected.id}
                onClick={(e) => e.stopPropagation()}
                className="relative m-2 w-full max-w-md overflow-auto rounded border border-gray-700 bg-gray-800/30 p-4 shadow backdrop-blur"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
              >
                <Image
                  className="mx-auto w-fit"
                  src={selected.image.src}
                  alt={selected.image.alt}
                  width={70}
                  height={70}
                />
                <h6 className="text-2xl font-bold">{selected.details.title}</h6>
                <p className="mt-1 text-gray-300">
                  {selected.details.description}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

const SkillItem = ({ animate, onClick, image, details, id }) => {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer rounded border border-gray-700/70 bg-gray-800/50 p-2 backdrop-blur md:p-4"
      initial={{
        x: animate.x,
        y: animate.y,
        rotate: animate.rotate,
        opacity: 0,
      }}
      layoutId={id}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      exit={{ transition: { duration: 0.5 } }}
      transition={{ duration: 3, ease: "easeInOut" }}
      title={details.title}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
      />
    </motion.div>
  );
};

export default Skills;
