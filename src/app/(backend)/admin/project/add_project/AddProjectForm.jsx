"use client";
// packages
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// hooks
import { useRouter } from "next/navigation";
import useStateData from "@/hooks/useStateData";
// Components
import Input from "@/components/utilities/formik/Input";
import Button from "@/components/utilities/Button";
import Textarea from "@/components/utilities/formik/Textarea";
import Select from "@/components/utilities/formik/Select";
import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import DatePickerComp from "@/components/DatePicker";
import TextEditor from "@/components/TextEditor";
import EditSlug from "@/components/EditSlug";
// libs
import reCaptcha from "@/lib/reCaptcha";
import createProject from "@/lib/actions/project/createProject";
import Alert from "@/config/Alert.config";
// others
import { addProjectSchema } from "@/schemas/project";
import revalidate from "@/lib/revalidate";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import TagInput from "@/components/utilities/formik/TagInput";

const AddProjectForm = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const { edgestore } = useEdgeStore();

  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("projectAdd"));

  const [spinner, setSpinner] = useState(false);

  // Image data
  const [thumbnailImg, setThumbnailImg] = useState({
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
    technologies: [],
    shortDes: "",
    des: "",
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
    if (!thumbnailImg.url) {
      Alert.fire({
        icon: "warning",
        text: "Please select an thumbnail image!",
      });
      setSpinner(false);
      return;
    }
    try {
      const projectTime = date.toISOString();
      await edgestore.portfolioImages.confirmUpload({
        url: thumbnailImg.url,
      });
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
        technologies: e.technologies,
        shortDes: e.shortDes,
        des: JSON.parse(e.des),
        projectTime,
      };
      await createProject(projectData);
      Alert.fire({
        icon: "success",
        title: "Project is created!",
      });
      reset();
      revalidate("/admin/project/all_projects");
      router.push("/admin/project/all_projects");
    } catch (err) {
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
      console.error(err);
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
          <TagInput
            type="text"
            placeholder="Technologies"
            name="technologies"
          />
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
