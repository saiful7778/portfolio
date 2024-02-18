"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/Input";
import Textarea from "@/components/utilities/Textarea";
import useStateData from "@/hooks/useStateData";
import createContact from "@/lib/actions/createContact";
import Alert from "@/lib/config/Alert.config";
import reCaptcha from "@/lib/reCaptcha";
import { contactSchema } from "@/schemas/contact";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const recaptchaRef = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("contactPage"));

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    details: "",
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
    };
  };

  const handleSubmit = async (e, { resetForm }) => {
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
      const contactData = {
        fullName: e.fullName,
        email: e.email,
        phoneNumber: e.phoneNumber,
        subject: e.subject,
        details: e.details,
      };
      const res = await createContact(contactData);
      if (!res.success) {
        Alert.fire({
          icon: "error",
          text: res?.message,
        });
        return;
      }
      Alert.fire({
        icon: "success",
        title: "I shall respond very soon!",
      });
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
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <Form className="mx-auto my-36 w-full max-w-4xl space-y-2 rounded-md border border-gray-700 bg-gray-800 p-4 shadow-md">
        <Input type="text" placeholder="Your name" name="fullName" />
        <Input type="email" name="email" placeholder="Your email address" />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Your phone numder (optional)"
          maxLength={11}
        />
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          maxLength={50}
        />
        <Textarea
          className="h-52"
          placeholder="Details"
          name="details"
          textLimit={500}
        />
        {showReCaptchaState && (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
          />
        )}
        <Button disabled={spinner} type="submit" size="sm" variant="confirm">
          {spinner ? <Spinner size={15} /> : "Submit"}
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
