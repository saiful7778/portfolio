"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserAuthDropdown({
  user,
}: {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage asChild src={user?.image!} alt="user avatar photo">
            <Image
              src={user?.image!}
              alt="user avatar photo"
              width={32}
              height={32}
            />
          </AvatarImage>
          <AvatarFallback>{user?.name![0]! + user?.name![1]!}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="text-sm leading-3">{user?.name}</div>
          <div className="text-xs font-normal text-gray-500">{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut()}
          className="cursor-pointer justify-center bg-destructive"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
