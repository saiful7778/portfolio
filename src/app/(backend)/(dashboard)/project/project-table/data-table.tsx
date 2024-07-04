import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { FC } from "react";

interface ProjectTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

const projectTable: FC<ProjectTableProps<TData>> = () => {
  // const globalFilterFn: FilterFn<User> = (row, _, filterValue) => {
  //   const user = row.original as User;
  //   return (
  //     user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
  //     user.email.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // globalFilterFn: globalFilterFn as unknown as FilterFn<TData>,
  });
  return <div>projectTable</div>;
};

export default projectTable;
