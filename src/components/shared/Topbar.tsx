"use client";
// packages
import Link from "next/link";
import Image from "next/image";
import useStateData from "@/hooks/useStateData";
// components
import Button from "@/components/ui/button";
// icons
import { LuMenuSquare } from "react-icons/lu";
// assets
import profileImage from "../../../public/saiful_image.png";
// import moment from "moment";
import UserAuthDropdown from "../UserAuthDropdown";

const Topbar = ({
  user,
}: {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) => {
  const { handleSidebar } = useStateData();

  return (
    <div className="fixed left-0 top-0 z-[110] flex h-10 w-full items-center justify-between gap-2 border-b border-border bg-card p-1">
      <div className="flex items-center gap-2">
        <Button className="ml-0.5" size="icon" onClick={handleSidebar}>
          <LuMenuSquare size={20} />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Image src={profileImage} width={30} height={30} alt="site logo" />
          <span className="hidden text-xl font-bold md:block">
            Saiful Islam
          </span>
        </Link>
      </div>
      <UserAuthDropdown user={user} />
    </div>
  );
};

export default Topbar;
