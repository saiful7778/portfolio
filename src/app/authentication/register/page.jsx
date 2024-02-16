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
import imageUpload from "@/lib/imageUpload";
import create from "@/lib/CRUD/create";
// others
import { registerSchema } from "@/schemas/authentication";
import Alert from "@/lib/config/Alert.config";

const RegisterPage = () => {
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
    image: null,
    name: "",
    size: "",
    type: "",
    alt: "",
  });
  const handleProfileImage = (imageData) => {
    setProfileImage({ ...profileImage, ...imageData });
  };

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
      handleProfileImage({
        image: null,
        name: "",
        size: "",
        type: "",
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
      if (profileImage?.image) {
        const data = await imageUpload(profileImage.image, profileImage.name);
        const userData = {
          name: e.fullName,
          email: e.email,
          password: e.password,
          image: data?.data?.thumb?.url,
        };
        await createUser(userData);
      } else {
        const userData = {
          name: e.fullName,
          email: e.email,
          password: e.password,
          image: "",
        };
        await createUser(userData);
      }
      route.push("/");
      reset();
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
      <ImageUpload
        handleImageData={handleProfileImage}
        imageData={profileImage}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={submitData}
      >
        <Form className="mt-4 space-y-2">
          <Input type="text" name="fullName" placeholder="Full Name" />
          <Input type="text" name="email" placeholder="Email address" />
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

const createUser = async (userData) => {
  try {
    await create("/api/auth/register", userData);
    Alert.fire({
      icon: "success",
      title: "Account is created!",
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default RegisterPage;
