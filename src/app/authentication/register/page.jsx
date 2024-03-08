import getSettings from "@/lib/data/getSettings";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const res = await getSettings();

  if (res.data[0].blockPage && res.data[0].blockPage.includes("registerPage")) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
