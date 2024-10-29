import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import type { PageParams } from "@/types";

export const metadata: Metadata = {
  title: "Login - Saiful Islam - Portfolio",
  description:
    "This is user login page of Saiful Islam personal portfolio website.",
};

interface LoginParams extends PageParams {
  searchParams: Promise<{
    callbackUrl?: string | undefined;
  }>;
}

const Login: React.FC<LoginParams> = async ({ searchParams }) => {
  const queryParams = await searchParams;

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Login Form</h1>
      <LoginForm callbackUrl={queryParams?.callbackUrl} />
    </>
  );
};

export default Login;
