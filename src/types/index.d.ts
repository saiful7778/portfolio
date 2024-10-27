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
