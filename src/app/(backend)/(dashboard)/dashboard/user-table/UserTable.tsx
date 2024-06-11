import DataTable from "./date-table";
import { columns } from "./columns";
import getUsers from "@/lib/serverData/getUsers";

const UserTable = async () => {
  const users = await getUsers({
    include: {
      image: {
        select: {
          url: true,
          alt: true,
        },
      },
    },
  });

  return <DataTable columns={columns} data={users!} />;
};

export default UserTable;
