import db from "@/lib/db";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import UserTable from "./user-table/UserTable";

async function getProjects() {
  try {
    return db.project.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
async function getBlogs() {
  try {
    return db.blog.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export default async function DashBoard() {
  const projects = await getProjects();
  const blogs = await getBlogs();
  const session = await useAuth();

  return (
    <>
      <h1 className="text-3xl font-bold">
        Welcome to Saiful Islam Portfolio Dashboard
      </h1>
      <div className="my-8 flex justify-evenly gap-4">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-28">Total projects</div>
            <span>:</span>
            <div>{projects?.length}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-28">Last project</div>
            <span>:</span>
            <div>
              <Link
                href={`/project/${projects![projects?.length! - 1].slug}?Id=${projects![projects?.length! - 1].id}`}
                className="hover:text-blue-500 hover:underline"
              >
                {projects![projects?.length! - 1].title}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div className="w-28">Total Blogs</div>
            <span>:</span>
            <div>{blogs?.length}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-28">Last Blog</div>
            <span>:</span>
            <div>
              <Link
                href={`/blog/${blogs![blogs?.length! - 1].slug}?Id=${blogs![blogs?.length! - 1].id}`}
                className="hover:text-blue-500 hover:underline"
              >
                {blogs![blogs?.length! - 1].title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {session?.user.role === "admin" && <UserTable />}
    </>
  );
}
