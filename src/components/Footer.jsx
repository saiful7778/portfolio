// next.js packages
import Image from "next/image";
import Link from "next/link";
// icons
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa6";
// assets
import profile from "../../public/saiful_image.png";
// others
import { navLinks } from "@/staticData";

const Footer = () => {
  const renderNavLinks = navLinks.map((nav) => (
    <Link key={"ft" + nav._id} href={nav.path}>
      {nav.navName}
    </Link>
  ));
  return (
    <div className="bg-gray-800/50">
      <div className="flex flex-col items-center justify-between gap-4 p-14 md:flex-row">
        <Link href="/">
          <Image
            src={profile}
            className="mx-auto"
            width={80}
            height={80}
            alt="site logo"
          />
          <span className="text-xl font-bold">Saiful Islam</span>
        </Link>
        <div>
          <nav className="flex items-center gap-4 whitespace-nowrap capitalize text-gray-400">
            {renderNavLinks}
          </nav>
          <div className="mt-4 flex items-center justify-end gap-4 text-gray-400 max-md:justify-center">
            <Link
              href="https://www.facebook.com/Saiful.Islam.Rafi.89"
              target="_blank"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/saiful-islam-0471b924b"
              target="_blank"
            >
              <FaLinkedin size={25} />
            </Link>
            <Link href="https://github.com/saiful7778" target="_blank">
              <FaGithub size={25} />
            </Link>
          </div>
        </div>
      </div>
      <p className="bg-gray-800/60 p-6 text-center text-gray-400">
        © 2023 Saiful Islam. All rights reserved by{" "}
        <Link
          className="link"
          href="https://github.com/saiful7778"
          target="_blank"
        >
          Saiful Islam
        </Link>
      </p>
    </div>
  );
};

export default Footer;
