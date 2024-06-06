import db from "@/lib/db";
import { DataTable } from "./date-table";
import { columns } from "./columns";

async function getUsers() {
  try {
    return db.user.findMany({
      include: {
        image: {
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export default async function UserTable() {
  const users = await getUsers();

  return (
    <div>
      <DataTable columns={columns} data={users!} />
    </div>
  );
}
