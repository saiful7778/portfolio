"use client";
import useStateData from "@/hooks/useStateData";
import cn from "@/lib/utils/cn";
import type { LayoutProps } from "@/types/types";
import Link from "next/link";
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
      <footer className="border-t bg-card p-6 text-center text-sm text-muted-foreground">
        <p>
          © 2023 Saiful Islam. All rights reserved by{" "}
          <Link
            className="link"
            href="https://github.com/saiful7778"
            target="_blank"
          >
            Saiful Islam
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
