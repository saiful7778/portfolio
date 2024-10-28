"use client";
import {
  DestructiveColorBlob,
  PrimaryColorBlob,
} from "@/components/GradientBlob";
import Button from "@/components/ui/button";
import type { ErrorProps } from "@/types";

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <PrimaryColorBlob className="-left-96 top-0" />
      <DestructiveColorBlob className="-right-96 top-28" />
      <h2 className="text-2xl font-bold">
        Something went <span className="text-red-600">wrong!</span>
      </h2>
      <pre>
        <code>{error.message}</code>
      </pre>
      <div>
        <Button onClick={() => reset()} variant="destructive">
          Refresh
        </Button>
      </div>
    </section>
  );
};

export default Error;
