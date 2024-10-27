import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/saiful_image.png";
import { navLinks } from "@/lib/staticData";
import { FaFacebook, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/50">
      <div className="flex flex-col items-center justify-between gap-4 p-14 md:flex-row">
        <Link href="/">
          <Image
            src={profileImage}
            className="mx-auto"
            width={80}
            height={80}
            alt="site logo"
          />
          <span className="text-xl font-bold">Saiful Islam</span>
        </Link>
        <div>
          <nav className="flex items-center gap-4 whitespace-nowrap capitalize text-muted-foreground">
            {navLinks.map((nav, idx) => (
              <Link key={"footer-nav-item-" + idx} href={nav.path}>
                {nav.navName}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-end gap-4 text-muted-foreground max-md:justify-center">
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
            <Link href="https://x.com/SaifulI87764986" target="_blank">
              <FaXTwitter size={25} />
            </Link>
          </div>
        </div>
      </div>
      <p className="bg-gray-800/60 p-6 text-center text-muted-foreground">
        © 2023 Saiful Islam. All rights reserved by{" "}
        <Link
          className="text-primary"
          href="https://github.com/saiful7778"
          target="_blank"
        >
          Saiful Islam
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
