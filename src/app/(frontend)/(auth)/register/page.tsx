import type { Metadata } from "next";
import RegistrationForm from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Register - Saiful Islam - Portfolio",
  description:
    "This is user register page of Saiful Islam personal portfolio website.",
};

const Register: React.FC = () => {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Register Form</h1>
      <RegistrationForm />
    </>
  );
};

export default Register;
