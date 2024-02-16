"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/utilities/Button";
import { settingsSchema } from "@/schemas/settings";
import { Form, Formik } from "formik";
import { useState } from "react";
import ReCaptcha from "./components/ReCaptcha";
import { dbWrite } from "@/db/dbWrite";
import useStateData from "@/hooks/useStateData";

const SettingsForm = ({ initialData }) => {
  const [spinner, setSpinner] = useState(false);
  const { handleReFetch } = useStateData();

  const initialValues = initialData || {
    reCaptcha: "",
    reCaptchaOnPage: [],
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    try {
      await dbWrite(e);
      handleReFetch();
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
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
