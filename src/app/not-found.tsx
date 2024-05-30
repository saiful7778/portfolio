import Button from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h2 className="text-9xl font-bold">404!</h2>
      <code>Not Found!</code>
      <p>Could not find requested resource</p>
      <Button variant="destructive" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
