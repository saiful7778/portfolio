"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/utilities/Button";
import { settingsSchema } from "@/schemas/settings";
import { Form, Formik } from "formik";
import { useState } from "react";
import ReCaptcha from "./components/ReCaptcha";
import useStateData from "@/hooks/useStateData";
import setSettings from "@/lib/DB/setSettings";
import Alert from "@/lib/config/Alert.config";
import revalidate from "@/lib/revalidate";
import Blockpage from "./components/Blockpage";

const SettingsForm = ({ initialData }) => {
  const [spinner, setSpinner] = useState(false);
  const { handleReFetch } = useStateData();

  const initialValues = {
    reCaptcha: initialData?.reCaptcha,
    reCaptchaOnPage: initialData?.reCaptchaOnPage,
    blockPage: initialData?.blockPage,
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    const res = await setSettings(initialData?.id, e);
    if (!res.success) {
      Alert.fire({
        icon: "error",
        text: res.message,
      });
    } else {
      Alert.fire({
        icon: "success",
        title: "Settings is updated",
      });
    }
    revalidate("/admin/settings");
    handleReFetch();
    setSpinner(false);
  };

  return (
    <Formik
      validationSchema={settingsSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
        <ReCaptcha />
        <Blockpage />
        <Button disabled={spinner} type="submit" size="sm" variant="confirm">
          {spinner ? <Spinner size={15} /> : "Submit"}
        </Button>
      </Form>
    </Formik>
  );
};

export default SettingsForm;
