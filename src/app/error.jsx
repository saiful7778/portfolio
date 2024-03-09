"use client";
import Button from "@/components/utilities/Button";
import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <h2 className="text-2xl font-bold">
        Something went <span className="text-red-600">wrong!</span>
      </h2>
      <div>
        <Button onClick={() => reset()} variant="cancel">
          Refrash
        </Button>
      </div>
    </main>
  );
};

export default Error;
