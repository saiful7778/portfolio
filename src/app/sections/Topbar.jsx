"use client";
// packages
import Link from "next/link";
import Image from "next/image";
// hooks
import { signOut, useSession } from "next-auth/react";
import useStateData from "@/hooks/useStateData";
// components
import Button from "@/components/utilities/Button";
import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
// icons
import { LuMenuSquare } from "react-icons/lu";
// assets
import profileImage from "../../../public/saiful_image.png";
import { Popover } from "@headlessui/react";
import moment from "moment";

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
        <Popover className="relative h-8 w-fit">
          <Popover.Button className="h-8">
            <Avatar size="sm" photoURL={data?.user?.image} />
          </Popover.Button>
          <Popover.Panel className="absolute right-0 top-full z-50 mt-1 overflow-hidden whitespace-nowrap rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs">
            <div className="rounded px-2 py-1 hover:bg-gray-700">
              {data?.user?.name}
            </div>
            <div className="rounded px-2 py-1 hover:bg-gray-700">
              {data?.user?.email}
            </div>
            <div className="rounded px-2 py-1 hover:bg-gray-700">
              Expair: {moment(data?.expires).format("Do MMM YY, h:mm a")}
            </div>
            <Button
              onClick={() => signOut()}
              className="mt-2 w-full"
              variant="cancel"
              size="sm"
            >
              Log out
            </Button>
          </Popover.Panel>
        </Popover>
      )}
    </div>
  );
};

export default Topbar;
