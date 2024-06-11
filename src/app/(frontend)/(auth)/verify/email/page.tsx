import Button from "@/components/ui/button";
import Link from "next/link";
import VerifyButton from "./VerifyButton";
import db from "@/lib/db";
import { FC } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify email - Saiful Islam portfolio",
  description:
    "This is user email verify page of Saiful Islam portfolio website.",
};

interface VerifyProps {
  searchParams: { token?: string; id?: string };
}

const Verify: FC<VerifyProps> = async ({ searchParams: { token, id } }) => {
  if (!token || !id) {
    return (
      <div className="w-full rounded border border-red-600 bg-red-700 p-4 text-center">
        <div className="text-2xl font-semibold">
          Token and Id in unavailable
        </div>
        <div className="text-sm">Please provide token and id to proceed</div>
      </div>
    );
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        isVerified: true,
      },
    });

    if (!user) {
      return (
        <div className="w-full rounded border border-red-600 bg-red-700 p-4 text-center">
          <div className="text-2xl font-semibold">User does{`'`}t exist</div>
          <div className="text-sm">Please provide valid id</div>
        </div>
      );
    }
    if (user.isVerified) {
      return (
        <>
          <div className="w-full rounded border border-sky-500 bg-sky-700 p-4 text-center">
            <div className="text-2xl font-semibold">
              Email is already verified
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </>
      );
    }

    return (
      <div>
        <VerifyButton token={token} id={id} />
      </div>
    );
  } catch {
    return (
      <div className="w-full rounded border border-red-600 bg-red-700 p-4 text-center">
        <div className="text-2xl font-semibold">User cannot find</div>
        <div className="text-sm">Please provide valid id</div>
      </div>
    );
  }
};

export default Verify;
