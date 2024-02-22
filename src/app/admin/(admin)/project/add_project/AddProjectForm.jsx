"use client";
// packages
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// hooks
import { useRouter } from "next/navigation";
import useStateData from "@/hooks/useStateData";
// Components
import Input from "@/components/utilities/Input";
import Button from "@/components/utilities/Button";
import Textarea from "@/components/utilities/Textarea";
import Select from "@/components/utilities/Select";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import DatePickerComp from "@/components/DatePicker";
import TextEditor from "@/components/TextEditor";
import EditSlug from "@/components/EditSlug";
// libs
import reCaptcha from "@/lib/reCaptcha";
import createProject from "@/lib/actions/createProject";
import Alert from "@/lib/config/Alert.config";
// others
import { addProjectSchema } from "@/schemas/project";

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
    status: "",
    url: "",
    alt: "",
  });

  // project data
  const [date, setDate] = useState(new Date());

  const statusOptions = [
    { value: "published", text: "Published" },
    { value: "private", text: "Private" },
  ];

  const projectInitialValues = {
    title: "",
    status: "",
    editSlug: false,
    slug: "",
    githubLink: "",
    liveLink: "",
    shortDes: "",
    des: "",
  };

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
      const projectTime = date.toISOString();

      const projectData = {
        thumbnail: {
          url: thumbnailImg.url,
          alt: thumbnailImg.alt,
        },
        title: e.title,
        slug: e.slug,
        status: e.status,
        githubLink: e.githubLink,
        liveLink: e.liveLink,
        shortDes: e.shortDes,
        des: JSON.parse(e.des),
        projectTime,
      };
      const res = await createProject(projectData);
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
        title: "Project is created!",
      });
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
      <ImageUpload setImageData={setThumbnailImg} size="lg" folder="project" />
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
          <EditSlug
            checkboxName="editSlug"
            checkboxLabel="Custom slug"
            refName="title"
            inputName="slug"
            inputPlaceholder="Slug"
          />
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
          <TextEditor name="des" placeholder="Project Description" />
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
