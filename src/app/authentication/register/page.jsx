import getSettings from "@/lib/DB/getSettings";
import RegisterForm from "./RegisterForm";
import ErrorDataShow from "@/components/ErrorDataShow";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const res = await getSettings();

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  if (res.data[0].blockPage && res.data[0].blockPage.includes("registerPage")) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
