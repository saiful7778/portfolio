"use client";
// packages
import Link from "next/link";
import Image from "next/image";
// hooks
import { signOut, useSession } from "next-auth/react";
import useStateData from "@/hooks/useStateData";
// components
import Button from "./utilities/Button";
import Avatar from "./Avatar";
import { Popover } from "keep-react";
import Spinner from "./Spinner";
// icons
import { LuMenuSquare } from "react-icons/lu";
// assets
import profileImage from "../../public/saiful_image.png";

const Topbar = () => {
  const { handleSidebar } = useStateData();
  const { data, status } = useSession();

  return (
    <div className="fixed left-0 top-0 z-[110] flex h-10 w-full items-center justify-between gap-2 border-b border-gray-700 bg-gray-800 p-1">
      <div className="flex items-center gap-2">
        <Button
          className="ml-0.5"
          variant="primary-outline"
          size="sm"
          shape="icon-button"
          onClick={handleSidebar}
        >
          <LuMenuSquare size={20} />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Image src={profileImage} width={30} height={30} alt="site logo" />
          <span className="hidden text-xl font-bold md:block">
            Saiful Islam
          </span>
        </Link>
      </div>
      {status === "loading" ? (
        <Spinner size={15} />
      ) : (
        <Popover
          showDismissIcon={false}
          showArrow={false}
          className="border border-gray-700 !bg-gray-800 !px-2 !py-2 text-xs"
        >
          <Popover.Action className="h-8">
            <Avatar size="sm" photoURL={data?.user?.image} />
          </Popover.Action>
          <Popover.Container className="!mt-0 !block">
            <ul>
              <li>
                <div className="rounded px-2 py-1 hover:bg-gray-700">
                  Name: {data?.user?.name}
                </div>
              </li>
              <li>
                <div className="rounded px-2 py-1 hover:bg-gray-700">
                  Email: {data?.user?.email}
                </div>
              </li>
              <li>
                <Button
                  onClick={() => signOut()}
                  className="mt-2 w-full"
                  variant="cancel"
                  size="sm"
                >
                  Log out
                </Button>
              </li>
            </ul>
          </Popover.Container>
        </Popover>
      )}
    </div>
  );
};

export default Topbar;
