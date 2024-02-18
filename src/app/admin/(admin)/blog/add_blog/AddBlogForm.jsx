"use client";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/utilities/Button";
import CheckboxItem from "@/components/utilities/CheckboxItem";
import Input from "@/components/utilities/Input";
import InputRef from "@/components/utilities/InputRef";
import Select from "@/components/utilities/Select";
import useStateData from "@/hooks/useStateData";
import { addBlogSchema } from "@/schemas/blog";
import { Form, Formik, useField } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const AddBlogForm = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" && showReCaptcha.page.includes("blogAdd"));

  const [spinner, setSpinner] = useState(false);
  // Image data
  const [thumbnailImg, setThumbnailImg] = useState({
    image: null,
    name: "",
    size: "",
    type: "",
    alt: "",
  });

  const handleThumbnailImage = (imageData) => {
    setThumbnailImg({ ...thumbnailImg, ...imageData });
  };

  const blogInitialValues = {
    title: "",
    status: "",
    editSlug: false,
    slug: "",
    des: "",
  };

  const statusOptions = [
    { value: "published", text: "Published" },
    { value: "private", text: "Private" },
  ];

  const handleSubmit = async (e, { resetForm }) => {
    console.log(e);
  };

  return (
    <>
      <ImageUpload
        handleImageData={handleThumbnailImage}
        imageData={thumbnailImg}
      />
      <Formik
        initialValues={blogInitialValues}
        validationSchema={addBlogSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-2">
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <Input
              type="text"
              className="flex-1"
              placeholder="Blog Title"
              name="title"
              maxLength={50}
            />
            <Select
              name="status"
              defaultValue="--select-blog-status"
              options={statusOptions}
            />
          </div>
          <CheckBox />
          <TextEditor name="des" placeholder="Blog description...." />
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
    </>
  );
};

const CheckBox = () => {
  const [{ value }] = useField("editSlug");
  return (
    <>
      <CheckboxItem name="editSlug" id="editSlug" label="Custom slug" />
      {value && (
        <InputRef
          refName="title"
          customFunction={(inputData) =>
            inputData.toLowerCase().replace(/\s/g, "_").replace(/-/g, "")
          }
          type="text"
          placeholder="Slug"
          name="slug"
          maxLength={50}
        />
      )}
    </>
  );
};

export default AddBlogForm;
