"use client";
import Button from "@/components/ui/button";
import type { ErrorProps } from "@/types/types";
import { FC, useEffect } from "react";

const Error: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <h2 className="text-2xl font-bold">
        Something went <span className="text-red-600">wrong!</span>
      </h2>
      <code>{error.message}</code>
      <div>
        <Button onClick={() => reset()} variant="destructive">
          Refrash
        </Button>
      </div>
    </section>
  );
};

export default Error;
