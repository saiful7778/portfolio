import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login - Saiful Islam portfolio",
  description: "This is login page of Saiful Islam portfolio website.",
};

export default function Login({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  return (
    <>
      <h3 className="text-center text-3xl font-bold">Login</h3>
      {error && (
        <div className="w-full rounded border border-red-600 bg-red-700 p-4 text-center">
          <div className="text-2xl font-semibold">Authentication failed</div>
          <div className="text-sm">Please check yout email and password!</div>
        </div>
      )}
      <LoginForm />
    </>
  );
}
