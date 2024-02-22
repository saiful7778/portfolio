"use client";
// packages
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// hooks
import { useRef, useState } from "react";
import useStateData from "@/hooks/useStateData";
// next.js packages
import Link from "next/link";
import { useRouter } from "next/navigation";
// components
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/Input";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import Password from "@/components/utilities/Password";
// api operations
import reCaptcha from "@/lib/reCaptcha";
// others
import { registerSchema } from "@/schemas/authentication";
import Alert from "@/lib/config/Alert.config";
import createUser from "@/lib/actions/createUser";

const RegisterForm = () => {
  const [spinner, setSpinner] = useState(false);
  const recaptchaRef = useRef(null);
  const route = useRouter();
  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("register"));

  // Image data
  const [profileImage, setProfileImage] = useState({
    status: "",
    url: "",
    alt: "",
  });

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setProfileImage({
        status: "",
        url: "",
        alt: "",
      });
    };
  };

  const submitData = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    if (showReCaptchaState) {
      const captcha = await reCaptcha(recaptchaRef, () => {
        setSpinner(false);
      });
      if (!captcha) {
        reset();
        return;
      }
    }
    try {
      if (profileImage.status === "confirm") {
        const userData = {
          name: e.fullName,
          email: e.email,
          password: e.password,
          image: {
            url: profileImage.url,
            alt: profileImage.alt,
          },
        };
        await createUserData(userData, route, reset);
      } else {
        const userData = {
          name: e.fullName,
          email: e.email,
          password: e.password,
          image: {
            url: null,
            alt: null,
          },
        };
        await createUserData(userData, route, reset);
      }
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: err,
      });
      reset();
    }
  };

  return (
    <div className="rounded-md border border-gray-700 bg-slate-800 p-4 shadow-lg">
      <h3 className="text-center text-3xl font-bold">Register</h3>
      <ImageUpload setImageData={setProfileImage} folder="authentication" />
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={submitData}
      >
        <Form className="mt-4 space-y-2">
          <Input type="text" name="fullName" placeholder="Full Name" />
          <Input type="email" name="email" placeholder="Email address" />
          <Password placeholder="Password" name="password" />
          <Password placeholder="Confirm password" name="confirmPassword" />
          {showReCaptchaState && (
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
            {spinner ? <Spinner size={20} /> : "Register"}
          </Button>
        </Form>
      </Formik>
      <p className="mt-4 text-center text-sm text-gray-300">
        Go back to{" "}
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/authentication/login" className="link ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

const createUserData = async (userData, route, reset) => {
  const res = await createUser(userData);
  if (!res.success) {
    Alert.fire({
      icon: "error",
      text: res.message,
    });
    reset();
    return;
  }
  reset();
  const { isConfirmed } = await Alert.fire({
    icon: "success",
    title: "Account is created!",
    text: "Do you want to login",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
  if (isConfirmed) {
    route.push("/authentication/login");
  } else {
    route.push("/");
  }
};

export default RegisterForm;
