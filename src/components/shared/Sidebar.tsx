"use client";
// packages
import cn from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
// hooks
import { FC, ReactNode, useState } from "react";
import useStateData from "@/hooks/useStateData";
// icons
import { IoSettingsOutline, IoMailUnreadOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";

interface SidebarProps {
  role?: "user" | "admin";
}

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const { sidebar } = useStateData();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-[100] flex min-h-screen flex-col justify-between whitespace-nowrap border-r bg-card shadow duration-300",
        sidebar ? "w-36" : "max-sm:-left-full md:w-[43px]",
      )}
    >
      <nav className="mt-10 p-1.5">
        <ul className="flex w-full flex-col gap-2">
          <SidebarItem
            path="/dashboard"
            textShow={sidebar}
            icon={<LuLayoutDashboard />}
          >
            Deshboard
          </SidebarItem>
          <SidebarDropdown
            path="/project"
            textShow={sidebar}
            icon={<GoProjectSymlink />}
            title="Project"
          >
            <SidebarDropdownItem path="/project/add_project">
              Add Project
            </SidebarDropdownItem>
            <SidebarDropdownItem path="/project">
              All Projects
            </SidebarDropdownItem>
          </SidebarDropdown>
          <SidebarDropdown
            path="/blog"
            textShow={sidebar}
            icon={<BsFileEarmarkPostFill />}
            title="Blog"
          >
            <SidebarDropdownItem path="/blog/add_blog">
              Add Blog
            </SidebarDropdownItem>
            <SidebarDropdownItem path="/blog/all_blogs">
              All Blogs
            </SidebarDropdownItem>
          </SidebarDropdown>
          <SidebarItem path="/assets" textShow={sidebar} icon={<FaRegImages />}>
            Assets
          </SidebarItem>
          <SidebarItem
            path="/contacts"
            textShow={sidebar}
            icon={<IoMailUnreadOutline />}
          >
            Contacts
          </SidebarItem>
          {role === "admin" && (
            <>
              <hr className="" />
              <SidebarItem
                path="/settings"
                textShow={sidebar}
                icon={<IoSettingsOutline />}
              >
                Settings
              </SidebarItem>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

const style = {
  base: "inline-flex w-full items-center cursor-pointer rounded px-2 py-1 text-sm hover:bg-muted duration-100",
  active: "bg-muted shadow",
  inActive: "ring-1 ring-muted",
};

interface SidebarItemProps {
  children: string;
  path: string;
  icon: ReactNode;
  textShow: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  path,
  icon,
  textShow,
}) => {
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

interface SidebarDropdownProps {
  children: ReactNode;
  path: string;
  title: string;
  icon: ReactNode;
  textShow: boolean;
}

const SidebarDropdown: FC<SidebarDropdownProps> = ({
  children,
  path,
  title,
  icon,
  textShow,
}) => {
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
          <ul className="divide-y divide-border overflow-hidden border-b ">
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
          <ul className="divide-y divide-border border bg-card">{children}</ul>
        </div>
      )}
    </li>
  );
};

interface SidebarDropdownItemProps {
  path: string;
  children: string;
}

const SidebarDropdownItem: FC<SidebarDropdownItemProps> = ({
  path,
  children,
}) => {
  return (
    <li>
      <Link
        className="block w-full cursor-pointer px-2 py-1 text-xs hover:bg-border"
        href={path}
      >
        {children}
      </Link>
    </li>
  );
};

export default Sidebar;
