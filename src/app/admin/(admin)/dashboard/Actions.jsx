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
import { Popover } from "keep-react";
import ImageUpload from "@/components/ImageUpload";
import Button from "@/components/utilities/Button";
import Input from "@/components/utilities/Input";
import Spinner from "@/components/Spinner";
import Select from "@/components/utilities/Select";
import Modal from "@/components/Modal";
// icons
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
// api op
import imageUpload from "@/lib/imageUpload";
import revalidate from "@/lib/revalidate";
import reCaptcha from "@/lib/reCaptcha";
// other
import Alert from "@/lib/config/Alert.config";
import { userSchema } from "@/schemas/user";
import updateUser from "@/lib/actions/updateUser";
import deleteUser from "@/lib/actions/deleteUser";

const Actions = ({ userData }) => {
  const { data, status } = useSession();
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [updateImg, setUpdateImg] = useState(userData?.image ? true : false);
  const { showReCaptcha } = useStateData();
  const recaptchaRef = useRef(null);
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("userUpdate"));
  const [profileImg, setProfileImg] = useState({
    image: null,
    name: "",
    size: "",
    type: "",
    alt: "",
  });

  const handleProfileImg = (imageData) => {
    setProfileImg({ ...profileImg, ...imageData });
  };

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
        const res = deleteUser(userData.id);
        if (!res.success) {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
          return;
        }
        revalidate("/admin/dashboard");
        Alert.fire({
          icon: "success",
          title: "User is deleted",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
    }
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setModal(false);
      handleProfileImg({
        image: null,
        name: "",
        size: "",
        type: "",
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
      if (!updateImg && profileImg.image) {
        const data = await imageUpload(profileImg.image, profileImg.name);
        await updateUserData(userData.id, userData.email, {
          ...e,
          image: data?.data?.thumb?.url,
        });
      } else {
        await updateUserData(userData.id, userData.email, e);
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
      <Popover
        showDismissIcon={false}
        showArrow={false}
        position="left"
        className="border border-gray-700 !bg-gray-800 !px-2 !py-2 "
      >
        <Popover.Action>
          <Button size="sm" variant="primary-outline" shape="icon-button">
            <BsThreeDotsVertical size={15} />
          </Button>
        </Popover.Action>
        <Popover.Container className="!mt-0 !block">
          <ul>
            <li>
              <button
                onClick={handleDelete}
                className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700"
              >
                <span>Delete</span>
                <span>
                  <FaTrashCan />
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={handleModal}
                className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700"
              >
                <span>Edit</span>
                <span>
                  <CiEdit strokeWidth={1} />
                </span>
              </button>
            </li>
          </ul>
        </Popover.Container>
      </Popover>
      <Modal
        openModal={modal}
        closeModal={handleModal}
        modalTitle={`Update ${userData.name}`}
      >
        {updateImg ? (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={userData.image}
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
          <ImageUpload
            handleImageData={handleProfileImg}
            imageData={profileImg}
          />
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
  const res = await updateUser(id, email, data);
  if (!res.success) {
    Alert.fire({
      icon: "error",
      text: res.message,
    });
    return;
  }
  Alert.fire({
    icon: "success",
    title: "User is updated!",
  });
  revalidate("/admin/dashboard");
};

export default Actions;
