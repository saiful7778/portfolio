import StateProvider from "@/context/StateContext";

export const metadata = {
  title: "Authentication",
  description:
    "This is authentication page of Saiful Islam personal portfolio website.",
};

export default function AuthenticationLayout({ children }) {
  return (
    <StateProvider>
      <main className="bg-dark relative min-h-screen w-full overflow-x-hidden p-2 text-gray-50">
        <div className="mx-auto my-16 w-full max-w-sm">{children}</div>
      </main>
    </StateProvider>
  );
}
