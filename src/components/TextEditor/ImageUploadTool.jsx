"use client";
import { IoImageOutline } from "react-icons/io5";
import Tool from "./Tool";
import { useCallback, useState } from "react";
import Button from "../utilities/Button";
import ImageUpload from "../ImageUpload";
import Modal from "../Modal";

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
        open={modal}
        close={() => setModal((l) => !l)}
        title="Image upload"
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
