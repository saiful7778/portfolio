"use client";
import { IoImageOutline } from "react-icons/io5";
import Tool from "./Tool";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import { useCallback, useState } from "react";
import Button from "../utilities/Button";

const ImageUploadTool = ({ editor }) => {
  const [modal, setModal] = useState(false);
  const [loadImage, setLoadImage] = useState(null);
  // Image data
  const [img, setImg] = useState({
    image: null,
    name: "",
    size: "",
    type: "",
    alt: "",
    width: 0,
    height: 0,
  });
  const handleImage = (imageData) => {
    setImg({ ...img, ...imageData });
  };

  const handleUpload = useCallback(() => {
    setModal((l) => !l);
    if (loadImage) {
      editor
        .chain()
        .focus()
        .setImage({
          src: loadImage,
          alt: img.alt,
          title: img.name,
          width: img.width,
          height: img.height,
        })
        .run();
    }
  }, [editor, loadImage, img]);

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
        <ImageUpload
          handleImageData={handleImage}
          imageData={img}
          handleRenderImage={(imageData) => setLoadImage(imageData)}
        />
        <Button onClick={handleUpload} variant="confirm">
          Upload
        </Button>
      </Modal>
    </>
  );
};

export default ImageUploadTool;
