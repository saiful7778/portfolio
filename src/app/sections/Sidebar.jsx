"use client";
// packages
import cn from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
// hooks
import { useState } from "react";
import useStateData from "@/hooks/useStateData";
// icons
import { IoSettingsOutline, IoMailUnreadOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";

const Sidebar = () => {
  const { sidebar } = useStateData();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-[100] flex min-h-screen flex-col justify-between whitespace-nowrap border-r border-gray-700 bg-gray-800 shadow duration-300",
        sidebar ? "w-36" : "max-sm:-left-full md:w-[43px]",
      )}
    >
      <ul className="mt-10 flex w-full flex-col gap-2 p-1.5">
        <SidebarItem
          path="/admin/dashboard"
          textShow={sidebar}
          icon={<LuLayoutDashboard />}
        >
          Deshboard
        </SidebarItem>
        <SidebarDropdown
          path="/admin/project"
          textShow={sidebar}
          icon={<GoProjectSymlink />}
          title="Project"
        >
          <SidebarDropdownItem path="/admin/project/add_project">
            Add Project
          </SidebarDropdownItem>
          <SidebarDropdownItem path="/admin/project/all_projects">
            All Projects
          </SidebarDropdownItem>
        </SidebarDropdown>
        <SidebarDropdown
          path="/admin/blog"
          textShow={sidebar}
          icon={<BsFileEarmarkPostFill />}
          title="Blog"
        >
          <SidebarDropdownItem path="/admin/blog/add_blog">
            Add Blog
          </SidebarDropdownItem>
          <SidebarDropdownItem path="/admin/blog/all_blogs">
            All Blogs
          </SidebarDropdownItem>
        </SidebarDropdown>
        <SidebarItem
          path="/admin/assets"
          textShow={sidebar}
          icon={<FaRegImages />}
        >
          Assets
        </SidebarItem>
        <SidebarItem
          path="/admin/contacts"
          textShow={sidebar}
          icon={<IoMailUnreadOutline />}
        >
          Contacts
        </SidebarItem>
        <hr className="border-gray-700" />
        <SidebarItem
          path="/admin/settings"
          textShow={sidebar}
          icon={<IoSettingsOutline />}
        >
          Settings
        </SidebarItem>
      </ul>
    </div>
  );
};

const style = {
  base: "inline-flex w-full items-center cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-700 duration-100",
  active: "bg-gray-700 shadow",
  inActive: "ring-1 ring-gray-700",
};

const SidebarItem = ({ children, path, icon, textShow }) => {
  const pathName = usePathname();
  return (
    <li>
      <Link
        className={cn(
          style.base,
          pathName === path ? style.active : style.inActive,
          textShow || "justify-center",
        )}
        href={path}
      >
        <span>{icon}</span>
        <span className={cn(textShow ? "ml-1" : "w-0 overflow-hidden")}>
          {children}
        </span>
      </Link>
    </li>
  );
};

const SidebarDropdown = ({ children, path, title, icon, textShow }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathName = usePathname();
  const isActive = pathName.startsWith(path);
  return (
    <li className="group relative">
      <div
        onClick={() => setDropdownOpen((l) => !l)}
        className={cn(
          style.base,
          isActive ? style.active : style.inActive,
          textShow || "justify-center",
        )}
      >
        <span>{icon}</span>
        <span className={cn(textShow ? "ml-1" : "w-0 overflow-hidden")}>
          {title}
        </span>
        {textShow && (
          <span
            className={cn(
              "ml-auto transition duration-300",
              dropdownOpen ? "rotate-180" : "rotate-0",
            )}
          >
            <IoIosArrowDown />
          </span>
        )}
      </div>
      {textShow ? (
        <div
          className={cn(
            "ml-5 grid transition-all duration-300 ease-in-out",
            dropdownOpen
              ? "mt-1 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <ul className="divide-y divide-gray-700 overflow-hidden border-b border-gray-700">
            {children}
          </ul>
        </div>
      ) : (
        <div
          className={cn(
            "absolute left-full top-0 z-[200] w-24 whitespace-nowrap",
            dropdownOpen
              ? "visible opacity-100"
              : "invisible opacity-0 group-hover:visible group-hover:opacity-100",
          )}
        >
          <ul className="divide-y divide-gray-700 border border-gray-700 bg-gray-800">
            {children}
          </ul>
        </div>
      )}
    </li>
  );
};

const SidebarDropdownItem = ({ path, children }) => {
  return (
    <li>
      <Link
        className="block w-full cursor-pointer px-2 py-1 text-xs hover:bg-gray-700"
        href={path}
      >
        {children}
      </Link>
    </li>
  );
};

export default Sidebar;
