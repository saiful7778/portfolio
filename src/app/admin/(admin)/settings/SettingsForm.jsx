"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/utilities/Button";
import { settingsSchema } from "@/schemas/settings";
import { Form, Formik } from "formik";
import { useState } from "react";
import ReCaptcha from "./components/ReCaptcha";

const SettingsForm = () => {
  const [spinner, setSpinner] = useState(false);

  const initialValues = {
    reCaptcha: "",
    reCaptchaOnPage: [],
  };

  const handleSubmit = async (e) => {
    console.log(e);
  };

  return (
    <Formik
      validationSchema={settingsSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
        <ReCaptcha />
        <Button disabled={spinner} type="submit" size="sm" variant="confirm">
          {spinner ? <Spinner size={15} /> : "Submit"}
        </Button>
      </Form>
    </Formik>
  );
};

export default SettingsForm;
