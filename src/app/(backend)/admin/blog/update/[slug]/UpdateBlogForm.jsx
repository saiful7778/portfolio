"use client";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/formik/Input";
import Select from "@/components/utilities/formik/Select";
import useStateData from "@/hooks/useStateData";
import Alert from "@/config/Alert.config";
import reCaptcha from "@/lib/reCaptcha";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { addBlogSchema } from "@/schemas/blog";
import updateBlog from "@/lib/actions/blog/updateBlog";
import EditSlug from "@/components/EditSlug";
import ImageUpload from "@/components/ImageUpload";
import revalidate from "@/lib/revalidate";
import { useEdgeStore } from "@/context/EdgeStoreContext";

const UpdateBlogForm = ({ blogData }) => {
  const {
    id,
    title,
    status,
    slug,
    des,
    thumbnail: { url, alt },
  } = blogData;
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const statusOptions = [
    { value: "published", text: "Published" },
    { value: "private", text: "Private" },
  ];

  const [updateImage, setUpdateImage] = useState(false);
  const recaptchaRef = useRef(null);
  const { showReCaptcha } = useStateData();

  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("blogUpdate"));

  const [spinner, setSpinner] = useState(false);
  // Image data
  const [thumbnailImg, setThumbnailImg] = useState({
    url: "",
    alt: "",
  });

  const initialValues = {
    title: title,
    status: status,
    editSlug: false,
    slug: slug,
    des: JSON.stringify(des),
  };

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
    try {
      if (updateImage) {
        if (!thumbnailImg.url) {
          Alert.fire({
            icon: "warning",
            text: "Please select an thumbnail image!",
          });
          setSpinner(false);
          return;
        }
        /**
         * delete previous image
         */
        await edgestore.portfolioImages.delete({
          url,
        });
        /**
         * confirm update a new image
         */
        await edgestore.portfolioImages.confirmUpload({
          url: thumbnailImg.url,
        });
        await UpdateBlogData(
          id,
          {
            title: e.title,
            slug: e.slug,
            status: e.status,
            des: JSON.parse(e.des),
            thumbnail: { url: thumbnailImg.url, alt: thumbnailImg.alt },
          },
          router,
        );
      } else {
        await UpdateBlogData(
          id,
          {
            title: e.title,
            slug: e.slug,
            status: e.status,
            des: JSON.parse(e.des),
          },
          router,
        );
      }
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      reset();
    }
  };

  return (
    <>
      {updateImage ? (
        <ImageUpload size="lg" setImageData={setThumbnailImg} folder="blog" />
      ) : (
        <figure className="my-2 flex flex-col items-center gap-2">
          <Image
            className="mx-auto"
            src={url}
            alt={alt}
            title={title}
            width={656}
            height={369}
          />
          <Button
            onClick={() => setUpdateImage((l) => !l)}
            size="sm"
            variant="cancel"
          >
            Change
          </Button>
        </figure>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={addBlogSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-2">
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <Input
              type="text"
              className="flex-1"
              placeholder="Project Title"
              name="title"
              maxLength={50}
            />
            <Select
              name="status"
              defaultValue="--select-project-status"
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
          <TextEditor
            name="des"
            placeholder="Blog description...."
            content={des}
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
    </>
  );
};

const UpdateBlogData = async (id, userData, router) => {
  await updateBlog(id, userData);
  Alert.fire({
    icon: "success",
    title: "Blog is updated!",
  });
  revalidate("/admin/blog/all_blogs");
  router.push("/admin/blog/all_blogs");
};

export default UpdateBlogForm;
