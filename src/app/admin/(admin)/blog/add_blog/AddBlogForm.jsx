"use client";
import ImageUploadComp from "@/components/ImageUploadComp";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/utilities/Button";
import CheckboxItem from "@/components/utilities/CheckboxItem";
import Input from "@/components/utilities/Input";
import InputRef from "@/components/utilities/InputRef";
import Select from "@/components/utilities/Select";
import useStateData from "@/hooks/useStateData";
import createBlog from "@/lib/actions/createBlog";
import cn from "@/lib/cn";
import Alert from "@/lib/config/Alert.config";
import reCaptcha from "@/lib/reCaptcha";
import revalidate from "@/lib/revalidate";
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
    status: "",
    url: "",
    alt: "",
  });

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

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setThumbnailImg({
        status: "",
        url: "",
        alt: "",
      });
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
    if (!thumbnailImg.status) {
      Alert.fire({
        icon: "warning",
        text: "Please select an thumbnail image!",
      });
      setSpinner(false);
      return;
    } else if (thumbnailImg.status === "selected") {
      Alert.fire({
        icon: "warning",
        text: "Please upload this thumbnail image!",
      });
      setSpinner(false);
      return;
    } else if (thumbnailImg.status === "uploaded") {
      Alert.fire({
        icon: "warning",
        text: "Please confirm this thumbnail image!",
      });
      setSpinner(false);
      return;
    }
    try {
      const blogData = {
        thumbnail: {
          url: thumbnailImg.url,
          alt: thumbnailImg.alt,
        },
        title: e.title,
        slug: e.slug,
        status: e.status,
        des: e.des,
      };
      const res = await createBlog(blogData);
      if (!res.success) {
        Alert.fire({
          icon: "error",
          text: res?.message,
        });
        setSpinner(false);
        return;
      }
      Alert.fire({
        icon: "success",
        title: "blog is created!",
      });
      router.push("/admin/blog/all_blogs");
      revalidate("/admin/blog/all_blogs");
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
    <>
      <ImageUploadComp setImageData={setThumbnailImg} folder="blog" size="lg" />
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
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          value
            ? "mt-1 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <InputRef
          refName="title"
          className="overflow-hidden"
          customFunction={(inputData) =>
            inputData.toLowerCase().replace(/\s/g, "_").replace(/-/g, "")
          }
          type="text"
          placeholder="Slug"
          name="slug"
          maxLength={50}
        />
      </div>
    </>
  );
};

export default AddBlogForm;
