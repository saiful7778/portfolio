import EmptyData from "@/components/EmptyData";
import Table from "@/components/table";
import getBlogs from "@/lib/data/getBlogs";
import moment from "moment";
import Link from "next/link";
import Actions from "./Actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Blogs - admin - portfolio",
  description:
    "This is the all blogs management admin page of Saiful Islam portfolio website.",
};

const AllBlogs = async () => {
  const blogs = await getBlogs();

  if (blogs.length < 1) {
    return <EmptyData />;
  }

  const renderBlogs = blogs.map((blog, idx) => (
    <TableDataRow key={"blog" + idx} inputData={blog} count={idx + 1} />
  ));
  return (
    <Table>
      <Table.caption className="bg-gray-800 p-2 font-semibold">
        Total blogs: <span>{blogs.length}</span>
      </Table.caption>
      <Table.head>
        <Table.headCell className="min-w-9 text-center">#NO</Table.headCell>
        <Table.headCell className="min-w-60">Title</Table.headCell>
        <Table.headCell className="min-w-24">Status</Table.headCell>
        <Table.headCell className="min-w-56">Time</Table.headCell>
        <Table.headCell className="min-w-16">Actions</Table.headCell>
      </Table.head>
      <Table.body>{renderBlogs}</Table.body>
    </Table>
  );
};

const TableDataRow = ({ inputData, count }) => {
  const { id, title, slug, createdAt, updatedAt, status, thumbnail } =
    inputData || {};

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");

  return (
    <Table.row>
      <Table.cell className="text-center font-semibold">{count}</Table.cell>
      <Table.cell>
        <Link
          href={`/admin/blog/${slug}`}
          className="hover:text-blue-500 hover:underline"
        >
          {title}
        </Link>
        <Link className="link ml-1" target="_blank" href={`/blog/${slug}`}>
          live view
        </Link>
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
          <Actions blogId={id} slug={slug} thumbnail={thumbnail.url} />
        </div>
      </Table.cell>
    </Table.row>
  );
};

export default AllBlogs;
