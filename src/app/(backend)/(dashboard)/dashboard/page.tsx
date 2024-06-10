import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import UserTable from "./user-table/UserTable";
import { Metadata } from "next";
import { getBlogsCount, getLastBlog } from "@/lib/serverData/getBlogs";
import { getLastProject, getProjectsCount } from "@/lib/serverData/getProjects";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dashboard - Portfolio Saiful",
  authors: [
    {
      name: "Saiful Islam",
      url: "https://www.linkedin.com/in/saiful-islam-0471b924b",
    },
  ],
  description:
    "This is the dashboard page of Saiful Islam personal portfolio website.",
};

export default async function DashBoard() {
  const lastProject = await getLastProject({
    select: {
      id: true,
      slug: true,
      title: true,
    },
  });
  const projectCount = await getProjectsCount({});
  const blogCount = await getBlogsCount({});
  const lastBlog = await getLastBlog({
    select: {
      id: true,
      slug: true,
      title: true,
    },
  });
  const session = await useAuth();

  return (
    <>
      <h1 className="text-3xl font-bold">
        Welcome to Saiful Islam Portfolio Dashboard
      </h1>
      <div className="my-8 flex flex-col justify-evenly gap-4 md:flex-row">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-28">Total projects</div>
            <span>:</span>
            <div>{projectCount}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-28">Last project</div>
            <span>:</span>
            <div>
              <Link
                href={`/project/${lastProject?.slug}?Id=${lastProject?.id}`}
                className="hover:text-blue-500 hover:underline"
              >
                {lastProject?.title}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div className="w-28">Total Blogs</div>
            <span>:</span>
            <div>{blogCount}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-28">Last Blog</div>
            <span>:</span>
            <div>
              <Link
                href={`/blog/${lastBlog?.slug}?Id=${lastBlog?.id}`}
                className="hover:text-blue-500 hover:underline"
              >
                {lastBlog?.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {session?.user.role === "admin" && <UserTable />}
    </>
  );
}
