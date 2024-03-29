"use client";
// packages
import { Form, Formik } from "formik";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
// hooks
import { useSession } from "next-auth/react";
import useStateData from "@/hooks/useStateData";
import { useRef, useState } from "react";
// components
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/formik/Input";
import Spinner from "@/components/Spinner";
import Select from "@/components/utilities/formik/Select";
import ImageUpload from "@/components/ImageUpload";
import PopOver from "@/components/PopOver";
import Modal from "@/components/Modal";
// api op
import revalidate from "@/lib/revalidate";
import reCaptcha from "@/lib/reCaptcha";
// other
import Alert from "@/config/Alert.config";
import { userSchema } from "@/schemas/user";
import updateUser from "@/lib/actions/user/updateUser";
import deleteUser from "@/lib/actions/user/deleteUser";
import { useEdgeStore } from "@/context/EdgeStoreContext";

const Actions = ({ userData }) => {
  const { edgestore } = useEdgeStore();
  const { data, status } = useSession();
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [updateImg, setUpdateImg] = useState(userData.image.url ? true : false);
  const { showReCaptcha } = useStateData();
  const recaptchaRef = useRef(null);
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("userUpdate"));

  const [profileImg, setProfileImg] = useState({
    url: "",
    alt: "",
  });

  const handleModal = () => setModal((l) => !l);

  const userDataInitialValues = {
    name: userData.name,
    role: userData.role,
  };

  const roleOptions = [
    { value: "user", text: "User" },
    { value: "admin", text: "Admin" },
  ];

  const handleDelete = async () => {
    if (status === "authenticated" && userData.email === data?.user?.email) {
      Alert.fire({
        icon: "warning",
        text: "You can't delete current logged user.",
      });
      return;
    }
    const { isConfirmed } = await Alert.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      Alert.fire({
        didOpen: () => {
          Alert.showLoading();
        },
      });
      try {
        if (userData?.image?.url) {
          await edgestore.portfolioImages.delete({
            url: userData?.image?.url,
          });
        }
        await deleteUser(userData.id);
        Alert.fire({
          icon: "success",
          title: "User is deleted",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        revalidate("/admin/dashboard");
      }
    }
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setModal(false);
      setProfileImg({
        url: "",
        alt: "",
      });
    };
  };

  const handleUpdate = async (e, { resetForm }) => {
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
      if (!updateImg && profileImg.url) {
        await edgestore.portfolioImages.confirmUpload({
          url: profileImg.url,
        });
        await updateUserData(userData.id, userData.email, {
          ...e,
          image: {
            url: profileImg.url,
            alt: profileImg.alt,
          },
        });
      } else {
        await updateUserData(userData.id, userData.email, e);
      }
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      revalidate("/admin/dashboard");
      reset();
    }
  };

  return (
    <>
      <PopOver handleDelete={handleDelete} handleUpdate={handleModal} />
      <Modal open={modal} close={handleModal} title={`Update ${userData.name}`}>
        {updateImg ? (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={userData.image.url}
              width={150}
              height={150}
              alt={`${userData.name} image`}
            />
            <Button
              onClick={() => setUpdateImg((l) => !l)}
              size="sm"
              variant="cancel"
            >
              Remove
            </Button>
          </div>
        ) : (
          <ImageUpload setImageData={setProfileImg} folder="authentication" />
        )}
        <Formik
          initialValues={userDataInitialValues}
          validationSchema={userSchema}
          onSubmit={handleUpdate}
        >
          <Form className="mt-2">
            <div className="flex w-full gap-2">
              <Input
                type="text"
                className="flex-1"
                placeholder="Name"
                name="name"
              />
              <Select
                name="role"
                defaultValue="--select-user-role"
                options={roleOptions}
              />
            </div>
            {showReCaptchaState && (
              <ReCAPTCHA
                className="mt-2"
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              />
            )}
            <Button
              className="mt-2"
              disabled={spinner}
              type="submit"
              size="sm"
              variant="confirm"
            >
              {spinner ? <Spinner size={15} /> : "Submit"}
            </Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

const updateUserData = async (id, email, data) => {
  await updateUser(id, email, data);
  Alert.fire({
    icon: "success",
    title: "User is updated!",
  });
};

export default Actions;
