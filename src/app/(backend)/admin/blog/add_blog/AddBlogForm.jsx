"use client";
import EditSlug from "@/components/EditSlug";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/formik/Input";
import Select from "@/components/utilities/formik/Select";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import useStateData from "@/hooks/useStateData";
import createBlog from "@/lib/actions/blog/createBlog";
import Alert from "@/config/Alert.config";
import reCaptcha from "@/lib/reCaptcha";
import revalidate from "@/lib/revalidate";
import { addBlogSchema } from "@/schemas/blog";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const AddBlogForm = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const { edgestore } = useEdgeStore();

  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" && showReCaptcha.page.includes("blogAdd"));

  const [spinner, setSpinner] = useState(false);
  // Image data
  const [thumbnailImg, setThumbnailImg] = useState({
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
    if (!thumbnailImg.url) {
      Alert.fire({
        icon: "error",
        text: "Please select and upload an image",
      });
      setSpinner(false);
      return;
    }
    try {
      await edgestore.portfolioImages.confirmUpload({
        url: thumbnailImg.url,
      });
      const blogData = {
        thumbnail: {
          url: thumbnailImg.url,
          alt: thumbnailImg.alt,
        },
        title: e.title,
        slug: e.slug,
        status: e.status,
        des: JSON.parse(e.des),
      };
      await createBlog(blogData);
      Alert.fire({
        icon: "success",
        title: "blog is created!",
      });
      reset();
      revalidate("/admin/blog/all_blogs");
      router.push("/admin/blog/all_blogs");
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
      reset();
    }
  };

  return (
    <>
      <ImageUpload setImageData={setThumbnailImg} folder="blog" size="lg" />
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
          <EditSlug
            checkboxName="editSlug"
            checkboxLabel="Custom slug"
            refName="title"
            inputName="slug"
            inputPlaceholder="Slug"
          />
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

export default AddBlogForm;
