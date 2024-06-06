"use client";
import Button from "@/components/ui/button";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <h2 className="text-2xl font-bold">
        Something went <span className="text-red-600">wrong!</span>
      </h2>
      <div>
        <Button onClick={() => reset()} variant="destructive">
          Refrash
        </Button>
      </div>
    </section>
  );
};

export default Error;
