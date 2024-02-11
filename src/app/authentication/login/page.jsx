"use client";
// packages
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// next.js packages
import { signIn } from "next-auth/react";
import Link from "next/link";
// hooks
import { useRef, useState } from "react";
import useStateData from "@/hooks/useStateData";
// components
import Spinner from "@/components/Spinner";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/Input";
import Password from "@/components/utilities/Password";
// others
import reCaptcha from "@/lib/reCaptcha";
import { loginSchema } from "@/schemas/authentication";

const LoginPage = ({ searchParams }) => {
  const [spinner, setSpinner] = useState(false);
  const { showReCaptcha } = useStateData();
  const recaptchaRef = useRef(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
    };
  };

  const submitData = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    if (showReCaptcha) {
      const captcha = await reCaptcha(recaptchaRef, () => {
        setSpinner(false);
      });
      if (!captcha) {
        reset();
        return;
      }
    }
    await signIn("credentials", {
      email: e.email,
      password: e.password,
      redirect: true,
      callbackUrl: searchParams?.callbackUrl || "/admin/dashboard",
    });
  };

  return (
    <div className="rounded-md border border-gray-700 bg-slate-800 p-4 shadow-lg">
      <h3 className="text-center text-3xl font-bold">Login</h3>
      {searchParams?.error && (
        <div className="w-full rounded border border-red-600 bg-red-700 p-4 text-center">
          <div className="text-2xl font-semibold">Authentication failed</div>
          <div className="text-sm">Please check yout email and password!</div>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={submitData}
      >
        <Form className="mt-4 space-y-2">
          <Input type="text" name="email" placeholder="Email address" />
          <Password placeholder="Password" name="password" />
          {showReCaptcha && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            />
          )}
          <Button
            variant="confirm"
            className="inline-flex w-full items-center justify-center"
            disabled={spinner}
            type="submit"
          >
            {spinner ? <Spinner size={20} /> : "Login"}
          </Button>
        </Form>
      </Formik>
      <p className="mt-4 text-center text-sm text-gray-300">
        Go back to{" "}
        <Link href="/" className="link">
          Home
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
