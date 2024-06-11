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
import Button from "@/components/ui/button";
import { FC } from "react";

interface UserAuthDropdownProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const UserAuthDropdown: FC<UserAuthDropdownProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage asChild src={user?.image!} alt="user avatar photo">
              <Image
                src={user?.image!}
                alt="user avatar photo"
                width={32}
                height={32}
              />
            </AvatarImage>
            <AvatarFallback className="font-semibold uppercase">
              {user?.name![0]! + user?.name![1]!}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut()}
          className="cursor-pointer justify-center bg-destructive hover:opacity-50"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAuthDropdown;
