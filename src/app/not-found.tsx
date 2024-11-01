import {
  DestructiveColorBlob,
  PrimaryColorBlob,
} from "@/components/GradientBlob";
import Button from "@/components/ui/button";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-6 overflow-x-hidden">
      <PrimaryColorBlob className="-left-96 top-0" />
      <DestructiveColorBlob className="-right-96 top-28" />
      <h2 className="text-9xl font-bold">404!</h2>
      <code>Not Found!</code>
      <p>Could not find requested resource</p>
      <Button variant="destructive" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
};

export default NotFound;
