import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";
import readData from "@/lib/settings/read";

const RegisterPage = async () => {
  const data = await readData();

  if (data.blockPage && data.blockPage.includes("registerPage")) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
