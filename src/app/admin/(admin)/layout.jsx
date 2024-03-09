"use client";
import cn from "@/lib/utils/cn";
import useStateData from "@/hooks/useStateData";
import Link from "next/link";

const ClientAdminLayout = ({ children }) => {
  const { sidebar } = useStateData();
  return (
    <div
      className={cn(
        "mt-10 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      <main className="mb-10 p-2">{children}</main>
      <footer className="border-t border-gray-700 bg-gray-800 p-6 text-center text-gray-400">
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

export default ClientAdminLayout;
