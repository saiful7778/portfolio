"use client";
import type { FilterFn } from "@tanstack/react-table";
import { userColumns } from "./userColumns";
import MainTable from "../MainTable";
import type { User } from "@/types/userTypes";
import revalidate from "@/lib/actions/revalidate";

const UserTable = ({ data }: { data: User[] }) => {
  const globalFilterFn: FilterFn<User> = (row, _columnId, filterValue) => {
    const userName = row.original.name;
    const userEmail = row.original.email;
    return (
      userName.toLowerCase().includes(filterValue) ||
      userEmail.toLowerCase().includes(filterValue)
    );
  };

  return (
    <MainTable
      data={data}
      notFoundText="No user found"
      columns={userColumns}
      placeholder="Find user"
      globalFilterFn={globalFilterFn}
      reFetch={() => {
        revalidate("/dashboard");
      }}
    />
  );
};

export default UserTable;
