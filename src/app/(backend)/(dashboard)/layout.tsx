"use client";
import useStateData from "@/hooks/useStateData";
import cn from "@/lib/utils/cn";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { sidebar } = useStateData();
  return (
    <div
      className={cn(
        "mt-10 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      <main className="mb-10 min-h-[calc(100vh-150px)] p-2">{children}</main>
    </div>
  );
}
