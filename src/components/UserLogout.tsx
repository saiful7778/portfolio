"use client";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function UserLogout() {
  return (
    <DropdownMenuItem
      onClick={async () => await signOut()}
      className="cursor-pointer justify-center bg-destructive"
    >
      Logout
    </DropdownMenuItem>
  );
}
