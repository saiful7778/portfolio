"use client";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog } from "lucide-react";
import { FC, useState } from "react";
import UpdateUser from "./UpdateUser";

interface UserRowActionProps {
  name: string;
  email: string;
  access: boolean;
  role: "user" | "admin";
}

const UserRowAction: FC<UserRowActionProps> = ({
  name,
  email,
  access,
  role,
}) => {
  const [userUpdate, setUserUpdate] = useState<boolean>(false);
  return (
    <>
      <UpdateUser
        open={userUpdate}
        onOpenChange={setUserUpdate}
        name={name}
        email={email}
        access={access}
        role={role}
      />
      <DropdownMenu>
        <div className="flex justify-center">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
              <span className="sr-only">Open user manage menu</span>
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>User manage</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUserUpdate((prev) => !prev)}>
            <UserCog size={16} /> <span>Update user</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserRowAction;
