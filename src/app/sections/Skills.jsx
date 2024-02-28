import Image from "next/image";
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

const Skills = () => {
  return (
    <>
      <SectionTitle
        title="My Skills"
        text="my all outstanding skills."
        blob={true}
      />
      <div className="relative mx-auto mb-16 w-fit">
        <div className="absolute right-0 top-0 h-48 w-48 bg-amber-500/20 blur-3xl filter"></div>
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-sky-600/40 blur-3xl filter"></div>
        <div className="absolute bottom-0 left-0 h-36 w-36 bg-red-600/50 blur-3xl filter"></div>
        <div className="m-1 flex items-end justify-center gap-1 md:m-4 md:gap-4">
          <SkillsItem>
            <SkillItemImage
              src={gitLogo}
              alt="git logo"
              width={30}
              height={30}
            />
            <SkillItemContent>
              <SkillItemTitle>Git</SkillItemTitle>
              <SkillItemData>
                Git is a distributed version control system that tracks changes
                in any set of computer files.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={nodeLogo}
              alt="node logo"
              width={70}
              height={70}
            />
            <SkillItemContent>
              <SkillItemTitle>Node</SkillItemTitle>
              <SkillItemData>
                Node.js is a cross-platform, open-source JavaScript runtime
                environment that can run on Windows, Linux, Unix, macOS, and
                more.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={htmlLogo}
              alt="html logo"
              width={80}
              height={80}
            />
            <SkillItemContent>
              <SkillItemTitle>HTML - Hyper Text Markup Language</SkillItemTitle>
              <SkillItemData>
                HTML is the standard markup language for creating Web pages.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={cssLogo}
              alt="css logo"
              width={80}
              height={80}
            />
            <SkillItemContent>
              <SkillItemTitle>CSS - Cascading Style Sheets</SkillItemTitle>
              <SkillItemData>
                Cascading Style Sheets is a style sheet language used for
                specifying the presentation and styling of a document written in
                a markup language such as HTML.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={nextjsLogo}
              alt="next.js logo"
              width={70}
              height={70}
            />
            <SkillItemContent>
              <SkillItemTitle>Next.js</SkillItemTitle>
              <SkillItemData>
                Next.js is an open-source web development framework created by
                the private company Vercel providing React-based web
                applications with server-side rendering and static website
                generation.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={githubLogo}
              alt="github logo"
              width={30}
              height={30}
            />
            <SkillItemContent>
              <SkillItemTitle>Github</SkillItemTitle>
              <SkillItemData>
                GitHub is an online software development platform. It{`'`}s used
                for storing, tracking, and collaborating on software projects.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
        </div>
        <div className="m-1 flex items-center justify-center gap-1 md:m-4 md:gap-4">
          <div className="flex flex-col items-end gap-1 md:gap-4">
            <SkillsItem>
              <SkillItemImage
                src={reactRouterLogo}
                alt="react router logo"
                width={70}
                height={70}
              />
              <SkillItemContent>
                <SkillItemTitle>React router</SkillItemTitle>
                <SkillItemData>
                  React Router is a JavaScript framework that lets us handle
                  client and server-side routing in React applications. It
                  enables the creation of single-page web or mobile apps that
                  allow navigating without refreshing the page.
                </SkillItemData>
              </SkillItemContent>
            </SkillsItem>
            <SkillsItem>
              <SkillItemImage
                src={reduxLogo}
                alt="Redux logo"
                width={70}
                height={70}
              />
              <SkillItemContent>
                <SkillItemTitle>Redux</SkillItemTitle>
                <SkillItemData>
                  Redux is an open-source JavaScript library for managing and
                  centralizing application state.
                </SkillItemData>
              </SkillItemContent>
            </SkillsItem>
          </div>
          <SkillsItem>
            <SkillItemImage
              src={jsLogo}
              alt="javascript logo"
              width={110}
              height={110}
            />
            <SkillItemContent>
              <SkillItemTitle>Javascript</SkillItemTitle>
              <SkillItemData>
                JavaScript often abbreviated as JS, is a programming language
                and core technology of the World Wide Web, alongside HTML and
                CSS.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={reactLogo}
              alt="react.js logo"
              width={125}
              height={125}
            />
            <SkillItemContent>
              <SkillItemTitle>React</SkillItemTitle>
              <SkillItemData>
                React is a free and open-source front-end JavaScript library for
                building user interfaces based on components. It is maintained
                by Meta.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <div className="flex flex-col items-end gap-1 md:gap-4">
            <SkillsItem>
              <SkillItemImage
                src={tenstackQueryLogo}
                alt="tenstack query logo"
                width={70}
                height={70}
              />
              <SkillItemContent>
                <SkillItemTitle>Tenstack query</SkillItemTitle>
                <SkillItemData>
                  Tenstack query is a declarative dependency on an asynchronous
                  source of data that is tied to a unique key.
                </SkillItemData>
              </SkillItemContent>
            </SkillsItem>
            <SkillsItem>
              <SkillItemImage
                src={stripeLogo}
                alt="Stripe logo"
                width={70}
                height={70}
              />
              <SkillItemContent>
                <SkillItemTitle>Stripe</SkillItemTitle>
                <SkillItemData>
                  Stripe powers online and in-person payment processing and
                  financial solutions for businesses of all sizes.
                </SkillItemData>
              </SkillItemContent>
            </SkillsItem>
          </div>
        </div>
        <div className="m-1 flex items-start justify-center gap-1 md:m-4 md:gap-4">
          <SkillsItem>
            <SkillItemImage
              src={sassLogo}
              alt="sass logo"
              width={30}
              height={30}
            />
            <SkillItemContent>
              <SkillItemTitle>Sass</SkillItemTitle>
              <SkillItemData>
                Sass is a preprocessor scripting language that is interpreted or
                compiled into Cascading Style Sheets.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={jwtLogo}
              alt="jwt logo"
              width={50}
              height={50}
            />
            <SkillItemContent>
              <SkillItemTitle>JWT - Json Web Token</SkillItemTitle>
              <SkillItemData>
                JSON Web Token is a proposed Internet standard for creating data
                with optional signature and/or optional encryption whose payload
                holds JSON that asserts some number of claims.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={firebaseLogo}
              alt="firebase logo"
              width={60}
              height={60}
            />
            <SkillItemContent>
              <SkillItemTitle>Firebase</SkillItemTitle>
              <SkillItemData>
                Firebase is a complate backend service and authentication.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={tailwindcssLogo}
              alt="React router logo"
              width={100}
              height={100}
            />
            <SkillItemContent>
              <SkillItemTitle>Tailwind CSS</SkillItemTitle>
              <SkillItemData>
                Tailwind CSS is an open source CSS framework. The main feature
                of this library is that, unlike other CSS frameworks like
                Bootstrap.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={mongodbLogo}
              alt="mongodb logo"
              width={50}
              height={50}
            />
            <SkillItemContent>
              <SkillItemTitle>MongoDB</SkillItemTitle>
              <SkillItemData>
                MongoDB is a source-available, cross-platform, document-oriented
                database program.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
          <SkillsItem>
            <SkillItemImage
              src={reCaptchaLogo}
              alt="reCaptcha logo"
              width={30}
              height={30}
            />
            <SkillItemContent>
              <SkillItemTitle>Google reCaptcha</SkillItemTitle>
              <SkillItemData>
                reCAPTCHA is a free service from Google that helps protect
                websites from spam and abuse. A “CAPTCHA” is a turing test to
                tell human and bots apart.
              </SkillItemData>
            </SkillItemContent>
          </SkillsItem>
        </div>
      </div>
    </>
  );
};

const SkillsItem = ({ children }) => {
  return (
    <div className="group relative inline-block w-fit rounded border border-gray-700/70 bg-slate-800 p-1 md:p-4">
      {children}
    </div>
  );
};

const SkillItemImage = ({ src, alt, width, height }) => {
  return <Image src={src} alt={alt} width={width} height={height} />;
};

const SkillItemContent = ({ children }) => {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 opacity-0 group-hover:visible group-hover:opacity-100 max-sm:hidden">
      <div className="m-2 w-80 rounded border border-gray-700 bg-gray-800/50 p-4 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

const SkillItemTitle = ({ children }) => {
  return <h6 className="text-lg font-semibold">{children}</h6>;
};

const SkillItemData = ({ children }) => {
  return <p className="mt-2 text-sm text-gray-300">{children}</p>;
};

export default Skills;
