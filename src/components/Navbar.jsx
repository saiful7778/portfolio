"use client";
// packages
import { useState } from "react";
// next.js packages
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// icons
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
// components
import Button from "./utilities/Button";
// assets
import profileImage from "../../public/saiful_image.png";
// others
import cn from "@/lib/cn";
import { navLinks } from "@/staticData";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const renderNavLinks = navLinks.map((nav) => (
    <li key={nav._id}>
      <NavLink path={nav.path}>{nav.navName}</NavLink>
    </li>
  ));

  return (
    <>
      <div className="fixed left-0 top-0 z-[100] w-full bg-transparent backdrop-blur">
        <nav className="mx-auto flex w-full items-center justify-between gap-2 p-4 lg:w-4/5">
          <Link href="/" className="flex items-center gap-2">
            <Image src={profileImage} width={30} height={30} alt="site logo" />
            <span className="text-2xl font-bold">Saiful Islam</span>
          </Link>
          <Button
            onClick={() => setMenu((l) => !l)}
            className="ml-auto block md:hidden"
            variant="primary-outline"
            size="sm"
          >
            <LuMenu size={20} strokeWidth={1} />
          </Button>
          <ul className="hidden w-1/2 items-center justify-evenly gap-4 md:flex">
            {renderNavLinks}
          </ul>
          <Button
            href="/contact"
            className="max-sm:hidden"
            variant="primary-outline"
          >
            Contact me
          </Button>
        </nav>
      </div>
      <div
        className={cn(
          "fixed top-0 z-[110] flex h-screen w-full max-w-xs flex-col items-center gap-2 bg-gray-800/70 p-4 shadow backdrop-blur duration-300",
          menu ? "right-0" : "-right-full",
        )}
      >
        <div className="absolute left-0 top-0 z-[111] m-4">
          <Button
            onClick={() => setMenu((l) => !l)}
            variant="primary-outline"
            size="sm"
          >
            <RxCross2 size={20} />
          </Button>
        </div>
        <Image
          src={profileImage}
          alt="saiful islam profile image"
          width={100}
          height={100}
        />
        <h4 className="text-2xl font-bold">Saiful Islam</h4>
        <ul className="space-y-4 text-center">{renderNavLinks}</ul>
        <Button href="/contact" variant="primary-outline">
          Contact me
        </Button>
      </div>
    </>
  );
};

const NavLink = ({ children, path }) => {
  const pathName = usePathname();
  return (
    <Link className={cn("nav-link", pathName === path && "active")} href={path}>
      {children}
    </Link>
  );
};

export default Navbar;
