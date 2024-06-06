import UserLogout from "@/components/UserLogout";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StateContextProvider from "@/context/StateContext";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default async function FrontendLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  return (
    <StateContextProvider>
      <header className="container">
        <Navbar />
      </header>
      <main className="container">{children}</main>
      {session && (
        <div className="fixed bottom-3 right-0 z-50 flex items-center justify-center rounded-l-full border border-gray-700 bg-gray-800 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-8">
                <AvatarImage
                  asChild
                  src={session.user.image}
                  alt="user avatar photo"
                >
                  <Image
                    src={session.user.image!}
                    alt="user avatar photo"
                    width={32}
                    height={32}
                  />
                </AvatarImage>
                <AvatarFallback>
                  {session.user?.name![0] + session.user?.name![1]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="text-sm leading-3">{session.user.name}</div>
                <div className="text-xs font-normal text-gray-500">
                  {session.user.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/admin/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <UserLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <Footer />
    </StateContextProvider>
  );
}
