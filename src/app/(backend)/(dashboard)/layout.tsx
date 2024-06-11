"use client";
import useStateData from "@/hooks/useStateData";
import cn from "@/lib/utils/cn";
import { LayoutProps } from "@/types/layoutTypes";
import { FC } from "react";

const DashboardLayout: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { sidebar } = useStateData();
  return (
    <div
      className={cn(
        "mt-10 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      <main className="mb-10 min-h-[calc(100vh-150px)] p-4">
        <div className="rounded border bg-card p-4 shadow">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
