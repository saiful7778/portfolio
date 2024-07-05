"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { User } from "@/types/userTypes";
import UserRowAction from "./UserRowAction";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "count",
    header: () => <div className="text-center">#NO</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    id: "userDetails",
    header: "User Details",
    cell: ({ row }) => {
      const image = row.original.image;
      const name = row.original.name;
      const email = row.original.email;
      const isVerified = row.original.isVerified;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage asChild src={image?.url!} alt={image?.alt!}>
              <Image
                src={image?.url!}
                alt={image?.alt!}
                width={32}
                height={32}
              />
            </AvatarImage>
            <AvatarFallback>{name![0]! + name![1]!}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold leading-tight">{name}</div>
            <div className="text-xs text-gray-400">
              {email}
              <span className="ml-1 text-sky-500">
                {isVerified ? "verified" : "not verified"}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    id: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
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
      );
    },
  },
  {
    id: "access",
    accessorKey: "access",
    header: () => <div className="text-center">Access</div>,
    cell: ({ row }) => {
      const access = row.getValue("access");
      return access ? (
        <div className="text-center text-sky-500">true</div>
      ) : (
        <div className="text-center text-destructive">false</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const name = row.original.name;
      const email = row.original.email;
      const access = row.original.access;
      const role = row.original.role;

      return (
        <UserRowAction name={name} email={email} access={access} role={role} />
      );
    },
  },
];
