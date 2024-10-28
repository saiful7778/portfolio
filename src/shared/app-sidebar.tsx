"use client";
import { FilePenLine, FolderGit2, Settings2 } from "lucide-react";
import NavMain from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import profileImage from "@/assets/saiful_image.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import type { SidebarNavItem } from "@/types";

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Projects",
    icon: FolderGit2,
    refUrl: "/admin/projects",
    items: [
      {
        title: "All projects",
        url: "/admin/projects",
      },
    ],
  },
  {
    title: "Blogs",
    icon: FilePenLine,
    refUrl: "/admin/blogs",
    items: [
      {
        title: "All Blogs",
        url: "/admin/blogs",
      },
      {
        title: "Add new Blog",
        url: "/admin/blogs/add-new-blog",
      },
    ],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings2,
  },
];

const userData = {
  name: "Saiful Islam",
  email: "saiful.islam.rafi.88@gmail.com",
  avatar: "/avatars/shadcn.jpg",
};

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image src={profileImage} width={32} height={32} alt="site logo" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Saiful Islam</span>
            <span className="truncate text-xs font-light">Admin</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMain items={sidebarNavItems} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
