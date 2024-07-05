import UserTable from "@/components/table/user-table/UserTable";
import getUsers from "@/lib/serverData/getUsers";

const UserTablePage = async () => {
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

  return <UserTable data={users!} />;
};

export default UserTablePage;
