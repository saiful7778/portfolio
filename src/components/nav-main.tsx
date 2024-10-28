"use client";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMain: React.FC<{ items: SidebarNavItem[] }> = ({ items }) => {
  const pathName = usePathname();

  return (
    <SidebarMenu>
      {items.map((item, idx) => {
        if (!item?.items) {
          return (
            <SidebarMenuItem key={`sidebar-item-${idx}`}>
              <SidebarMenuButton
                isActive={pathName === item?.url}
                tooltip={item.title}
                asChild
              >
                <Link href={item.url!}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        } else {
          return (
            <Collapsible
              key={`sidebar-item-${idx}`}
              className="group/collapsible"
              defaultOpen={item?.refUrl?.startsWith(pathName)}
              asChild
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem, subIdx) => (
                      <SidebarMenuSubItem
                        key={`sidebar-item-${idx}-subItem-${subIdx}`}
                      >
                        <SidebarMenuSubButton
                          isActive={pathName === subItem.url}
                          asChild
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }
      })}
    </SidebarMenu>
  );
};

export default NavMain;
