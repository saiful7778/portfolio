import Table from "@/components/table";
import moment from "moment";
import Link from "next/link";
import Actions from "./Actions";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../../../../prisma";
import ErrorDataShow from "@/components/ErrorDataShow";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects - admin - portfolio",
  description:
    "This is the all projects management admin page of Saiful Islam portfolio website.",
};

async function getProjects() {
  try {
    await connectToDB();
    const projects = await prisma.project.findMany();
    if (!projects) {
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: projects,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}

const AllProjectsPage = async () => {
  const res = await getProjects();

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  const { data: projects } = res;

  const renderProjects = projects.map((project, idx) => (
    <TableDataRow key={"project" + idx} inputData={project} count={idx + 1} />
  ));

  return (
    <Table>
      <Table.caption className="bg-gray-800 p-2 font-semibold">
        Total Projects: <span>{projects.length}</span>
      </Table.caption>
      <Table.head>
        <Table.headCell className="min-w-9 text-center">#NO</Table.headCell>
        <Table.headCell className="min-w-60">Title</Table.headCell>
        <Table.headCell className="min-w-80">Short Description</Table.headCell>
        <Table.headCell className="min-w-24">Status</Table.headCell>
        <Table.headCell className="min-w-56">Time</Table.headCell>
        <Table.headCell className="min-w-16">Actions</Table.headCell>
      </Table.head>
      <Table.body>{renderProjects}</Table.body>
    </Table>
  );
};

const TableDataRow = ({ inputData, count }) => {
  const { id, title, createdAt, updatedAt, shortDes, status } = inputData || {};

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");

  const titleLink = title.split(" ").join("_").toLowerCase();
  return (
    <Table.row>
      <Table.cell className="text-center font-semibold">{count}</Table.cell>
      <Table.cell>
        <Link
          href={{
            pathname: `/admin/project/${titleLink}`,
            query: { projectId: id },
          }}
          className="hover:text-blue-500 hover:underline"
        >
          {title}
        </Link>
      </Table.cell>
      <Table.cell>
        <p className="text-xs text-gray-400">{shortDes}</p>
      </Table.cell>
      <Table.cell>
        <div className="flex items-center justify-center">
          {status === "published" ? (
            <span className="select-none rounded border border-green-600 bg-green-700 px-2 py-1 text-xs font-medium">
              Published
            </span>
          ) : (
            <span className="select-none rounded border border-green-700 bg-green-900 px-2 py-1 text-xs font-medium">
              Private
            </span>
          )}
        </div>
      </Table.cell>
      <Table.cell className="text-xs">
        <div>
          <span className="font-semibold text-gray-500">Create:</span>{" "}
          {createdTime}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Update:</span>{" "}
          {updatedTime}
        </div>
      </Table.cell>
      <Table.cell>
        <div className="flex items-center justify-center">
          <Actions projectId={id} />
        </div>
      </Table.cell>
    </Table.row>
  );
};

export default AllProjectsPage;
