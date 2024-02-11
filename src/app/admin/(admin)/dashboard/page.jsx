import Avatar from "@/components/Avatar";
import Table from "@/components/table";
import { read } from "@/lib/CRUD/read";
import Actions from "./Actions";
import moment from "moment";

export const metadata = {
  title: "Deshboard - admin - portfolio",
  description: "This is dashboard page of Saiful Islam portfolio website.",
};

const DashboardPage = async () => {
  const users = await read("/api/data/users");

  const renderUser = users.map((user, idx) => (
    <TableDataRow key={user.name} inputData={user} count={idx + 1} />
  ));

  return (
    <Table>
      <Table.caption className="bg-gray-800 p-2 font-semibold">
        Total users: <span>{users.length}</span>
      </Table.caption>
      <Table.head>
        <Table.headCell className="min-w-9">#NO</Table.headCell>
        <Table.headCell className="min-w-80">User Details</Table.headCell>
        <Table.headCell className="min-w-24">Role</Table.headCell>
        <Table.headCell className="min-w-56">Time</Table.headCell>
        <Table.headCell className="min-w-16">Actions</Table.headCell>
      </Table.head>
      <Table.body>{renderUser}</Table.body>
    </Table>
  );
};

const TableDataRow = ({ inputData, count }) => {
  const { name, email, image, role, emailVerified, createdAt, updatedAt } =
    inputData || "";
  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");

  return (
    <Table.row>
      <Table.cell className="text-center font-semibold">{count}</Table.cell>
      <Table.cell>
        <div className="flex items-center gap-2">
          <Avatar size="sm" photoURL={image} />
          <div>
            <div className="font-semibold leading-tight">{name}</div>
            <div className="text-xs text-gray-400">
              {email}
              <span className="ml-1 text-sky-500">
                {emailVerified ? "verified" : "not verified"}
              </span>
            </div>
          </div>
        </div>
      </Table.cell>
      <Table.cell>
        <div className="flex items-center justify-center">
          {role === "admin" ? (
            <span className="select-none rounded border border-green-600 bg-green-700 px-2 py-1 text-xs font-medium">
              Admin
            </span>
          ) : (
            <span className="select-none rounded border border-green-700 bg-green-900 px-2 py-1 text-xs font-medium">
              User
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
          <Actions userData={inputData} />
        </div>
      </Table.cell>
    </Table.row>
  );
};

export default DashboardPage;
