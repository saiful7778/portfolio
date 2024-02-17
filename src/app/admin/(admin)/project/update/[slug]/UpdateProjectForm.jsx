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
import { Form, Formik, useField } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";
import updateProject from "@/lib/actions/updateProject";
import InputRef from "@/components/utilities/InputRef";
import CheckboxItem from "@/components/utilities/CheckboxItem";

const UpdateProjectForm = ({ projectData }) => {
  const {
    id,
    title,
    status,
    slug,
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
    editSlug: false,
    slug: slug,
    githubLink: githubLink,
    liveLink: liveLink,
    shortDes: shortDes,
    des: des,
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
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
        await updateProjectData(
          id,
          {
            title: e.title,
            slug: e.slug,
            status: e.status,
            githubLink: e.githubLink,
            liveLink: e.liveLink,
            shortDes: e.shortDes,
            des: e.des,
            projectTime,
            thumbnail: { url: data?.data?.thumb?.url, alt: thumbnailImg.alt },
          },
          router,
          reset,
        );
      } else {
        await updateProjectData(
          id,
          {
            title: e.title,
            slug: e.slug,
            status: e.status,
            githubLink: e.githubLink,
            liveLink: e.liveLink,
            shortDes: e.shortDes,
            des: e.des,
            projectTime,
          },
          router,
          reset,
        );
      }
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
        <div className="my-2 flex flex-col items-center gap-2">
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
          <CheckBox />
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
            name="des"
            placeholder="Project Description"
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

const updateProjectData = async (id, userData, router, reset) => {
  const res = await updateProject(id, userData);
  if (!res.success) {
    Alert.fire({
      icon: "error",
      text: res.message,
    });
    return;
  }
  Alert.fire({
    icon: "success",
    title: "Project is updated!",
  });
  reset();
  revalidate("/admin/project/all_projects");
  router.push("/admin/project/all_projects");
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

export default UpdateProjectForm;
