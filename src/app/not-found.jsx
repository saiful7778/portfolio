import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h2 className="text-9xl font-bold">404!</h2>
      <code>Not Found!</code>
      <p>Could not find requested resource</p>
      <Link href="/" className="link">
        Return Home
      </Link>
    </main>
  );
};
export default NotFound;
