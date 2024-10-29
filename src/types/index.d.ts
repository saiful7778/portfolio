import type { LucideIcon } from "lucide-react";

export interface LayoutProps {
  children: React.ReactNode;
}

export type hierarchyPathDataType = {
  name: string;
  type: "folder" | "file";
  children?: pathDataType[];
  comment?: string;
  link?: string;
};

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface SidebarNavItem {
  title: string;
  refUrl?: string;
  url?: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface userAuth {
  fullName: string;
  email: string;
  password: string;
}
