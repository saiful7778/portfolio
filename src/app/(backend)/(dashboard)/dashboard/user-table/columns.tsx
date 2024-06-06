"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type User = {
  name: string;
  email: string;
  isVerified: boolean;
  image?: {
    url: string;
    alt: string;
  } | null;
  access: boolean;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "count",
    header: () => <div className="text-center">#NO</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    id: "userDetails",
    header: "User Details",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              asChild
              src={user?.image?.url!}
              alt={user?.image?.alt!}
            >
              <Image
                src={user?.image?.url!}
                alt={user?.image?.alt!}
                width={32}
                height={32}
              />
            </AvatarImage>
            <AvatarFallback>{user?.name![0]! + user?.name![1]!}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold leading-tight">{user.name}</div>
            <div className="text-xs text-gray-400">
              {user.email}
              <span className="ml-1 text-sky-500">
                {user.isVerified ? "verified" : "not verified"}
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
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>User manage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
