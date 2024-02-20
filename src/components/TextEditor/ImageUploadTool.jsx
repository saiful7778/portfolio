"use client";
import { IoImageOutline } from "react-icons/io5";
import Tool from "./Tool";
import Modal from "../Modal";
import { useCallback, useState } from "react";
import Button from "../utilities/Button";
import ImageUpload from "../ImageUpload";

const ImageUploadTool = ({ editor }) => {
  const [modal, setModal] = useState(false);
  // Image data
  const [img, setImg] = useState({
    status: "",
    url: "",
    alt: "",
  });

  const handleUpload = useCallback(() => {
    setModal((l) => !l);
    if (img.status === "confirm") {
      editor
        .chain()
        .focus()
        .setImage({
          src: img.url,
          alt: img.alt,
        })
        .run();
    }
  }, [editor, img]);

  return (
    <>
      <Tool tag="undo" onClick={() => setModal((l) => !l)}>
        <IoImageOutline />
      </Tool>
      <Modal
        openModal={modal}
        closeModal={() => setModal((l) => !l)}
        modalTitle="Image upload"
      >
        <ImageUpload setImageData={setImg} size="sm" folder="editor" />
        <Button onClick={handleUpload} variant="confirm">
          Upload
        </Button>
      </Modal>
    </>
  );
};

export default ImageUploadTool;
