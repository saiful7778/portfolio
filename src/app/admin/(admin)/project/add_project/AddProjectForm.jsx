"use client";
// packages
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// custom hooks
import useStateData from "@/hooks/useStateData";
// Components
import Input from "@/components/utilities/Input";
import Button from "@/components/utilities/Button";
import Textarea from "@/components/utilities/Textarea";
import ImageUpload from "@/components/ImageUpload";
import Select from "@/components/utilities/Select";
import Spinner from "@/components/Spinner";
import DatePickerComp from "@/components/DatePicker";
import TextEditor from "@/components/TextEditor";
// libs
import imageUpload from "@/lib/imageUpload";
import reCaptcha from "@/lib/reCaptcha";
import create from "@/lib/CRUD/create";
// others
import Alert from "@/lib/config/Alert.config";
import { addProjectSchema } from "@/schemas/project";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";

const AddProjectForm = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("projectAdd"));
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

  // project data
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const statusOptions = [
    { value: "published", text: "Published" },
    { value: "private", text: "Private" },
  ];

  const projectInitialValues = {
    title: "",
    status: "",
    githubLink: "",
    liveLink: "",
    shortDes: "",
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
    if (!thumbnailImg) {
      Alert.fire({
        icon: "warning",
        text: "Please select an thumbnail image!",
      });
      setSpinner(false);
      return;
    }
    if (!description) {
      Alert.fire({
        icon: "warning",
        text: "Please add description!",
      });
      setSpinner(false);
      return;
    }
    try {
      const projectTime = date.toISOString();

      const slug = e.title.toLowerCase().split(" ").join("_");
      const thumbnailLink = await imageUpload(
        thumbnailImg.image,
        thumbnailImg.name,
      );

      const projectData = {
        thumbnail: {
          url: thumbnailLink?.data?.url,
          alt: thumbnailImg.alt,
        },
        title: e.title,
        slug,
        status: e.status,
        githubLink: e.githubLink,
        liveLink: e.liveLink,
        shortDes: e.shortDes,
        des: description,
        projectTime,
      };
      await create("/api/data/project", projectData);
      Alert.fire({
        icon: "success",
        title: "Project is created!",
      });
      revalidate("/admin/project/all_projects");
      router.push("/admin/project/all_projects");
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
      <ImageUpload
        handleImageData={handleThumbnailImage}
        imageData={thumbnailImg}
      />
      <Formik
        initialValues={projectInitialValues}
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

export default AddProjectForm;
