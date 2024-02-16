"use client";
import DatePickerComp from "@/components/DatePicker";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/Input";
import Select from "@/components/utilities/Select";
import Textarea from "@/components/utilities/Textarea";
import useStateData from "@/hooks/useStateData";
import Alert from "@/lib/config/Alert.config";
import imageUpload from "@/lib/imageUpload";
import reCaptcha from "@/lib/reCaptcha";
import { addProjectSchema } from "@/schemas/project";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import updateUser from "./update";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";

const UpdateProjectForm = ({ projectData }) => {
  const {
    id,
    title,
    status,
    githubLink,
    liveLink,
    shortDes,
    des,
    thumbnail: { url, alt },
  } = projectData;
  const router = useRouter();

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
      showReCaptcha.page.includes("projectUpdate"));
  const [spinner, setSpinner] = useState(false);
  const [description, setDescription] = useState(des);
  const [date, setDate] = useState(projectData.projectTime);
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

  const initialValues = {
    title: title,
    status: status,
    githubLink: githubLink,
    liveLink: liveLink,
    shortDes: shortDes,
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setDescription("");
      handleThumbnailImage({
        image: null,
        name: "",
        size: "",
        type: "",
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
      const projectTime = date.toISOString();
      const slug = e.title.toLowerCase().split(" ").join("_");
      if (updateImage) {
        if (!thumbnailImg.image) {
          Alert.fire({
            icon: "warning",
            text: "Please select an thumbnail image!",
          });
          setSpinner(false);
          return;
        }
        const data = await imageUpload(thumbnailImg.image, thumbnailImg.name);
        const res = await updateUserData(
          id,
          {
            ...e,
            slug,
            projectTime,
            des: description,
            thumbnail: { url: data?.data?.thumb?.url, alt: thumbnailImg.alt },
          },
          router,
        );
        if (!res) return;
      } else {
        const res = await updateUserData(
          id,
          {
            ...e,
            des: description,
            projectTime,
            slug,
          },
          router,
        );
        if (!res) return;
      }
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
      {updateImage ? (
        <ImageUpload
          handleImageData={handleThumbnailImage}
          imageData={thumbnailImg}
        />
      ) : (
        <div className="mb-2 flex flex-col items-center gap-2">
          <Image
            className="mx-auto"
            src={url}
            alt={alt}
            title={title}
            width={600}
            height={337}
          />
          <Button
            onClick={() => setUpdateImage((l) => !l)}
            size="sm"
            variant="cancel"
          >
            Change
          </Button>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={addProjectSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-2">
          <DatePickerComp
            date={date}
            setDate={setDate}
            label="Project start date"
          />
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
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            <Input type="url" placeholder="Github Link" name="githubLink" />
            <Input type="url" placeholder="Project Live Link" name="liveLink" />
          </div>
          <Textarea
            className="h-24"
            placeholder="Short Description"
            name="shortDes"
            textLimit={100}
          />
          <TextEditor
            placeholder="Project Description"
            onChange={setDescription}
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

const updateUserData = async (id, userData, router) => {
  const res = await updateUser({
    query: {
      id,
    },
    data: userData,
  });
  if (!res.success) {
    Alert.fire({
      icon: "error",
      text: res.message,
    });
    return false;
  }
  Alert.fire({
    icon: "success",
    title: "Project is updated!",
  });
  router.push("/admin/project/all_projects");
  revalidate("/admin/project/all_projects");
  return true;
};

export default UpdateProjectForm;
