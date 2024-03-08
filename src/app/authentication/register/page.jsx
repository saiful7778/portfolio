import getSettings from "@/lib/data/getSettings";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const settings = await getSettings();

  if (settings.blockPage && settings.blockPage.includes("registerPage")) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
