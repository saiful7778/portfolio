"use client";
import Image from "next/image";
import Link from "next/link";
import profileImage from "../../../public/saiful_image.png";
import { FC, ReactNode, useState } from "react";
import Button from "@/components/ui/button";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils/cn";
import { navLinks } from "@/lib/staticData";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const Navbar: FC = () => {
  const [menu, setMenu] = useState<boolean>(false);

  const renderNavLinks = navLinks.map((nav, idx) => (
    <li key={"nav-link-" + idx}>
      <NavLink path={nav.path} subPath={nav?.subPath}>
        {nav.navName}
      </NavLink>
    </li>
  ));

  return (
    <>
      <nav className="flex w-full items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src={profileImage} width={30} height={30} alt="site logo" />
          <span className="text-2xl font-bold">Saiful Islam</span>
        </Link>
        <div className="md:hidden">
          <Button onClick={() => setMenu((l) => !l)} size="icon">
            <LuMenu size={20} strokeWidth={1} />
          </Button>
        </div>
        <ul className="hidden w-1/2 items-center justify-evenly gap-4 md:flex">
          {renderNavLinks}
        </ul>
        <Button className="max-md:hidden" asChild>
          <Link href="/contact">Contact me</Link>
        </Button>
      </nav>
      <div
        className={cn(
          "fixed top-0 z-[110] flex h-screen w-full max-w-xs flex-col items-center gap-2 bg-gray-800/70 p-4 shadow backdrop-blur duration-300",
          menu ? "right-0" : "-right-full",
        )}
      >
        <div className="absolute left-0 top-0 z-[111] m-4">
          <Button onClick={() => setMenu((l) => !l)} size="icon">
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
        <Button asChild>
          <Link href="/contact">Contact me</Link>
        </Button>
      </div>
    </>
  );
};

interface NavLinkProps {
  children: ReactNode;
  path: string;
  subPath?: string;
}

function NavLink({ children, path, subPath }: NavLinkProps) {
  const pathName = usePathname();

  const subPathName = pathName.match(/\/(\w+?)\//);

  return (
    <Link
      className={cn(
        "nav-link",
        pathName === path
          ? "active"
          : subPathName && subPathName[1] === subPath && "active",
      )}
      href={path}
    >
      {children}
    </Link>
  );
}

export default Navbar;
