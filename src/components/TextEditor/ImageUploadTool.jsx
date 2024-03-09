"use client";
import { IoImageOutline } from "react-icons/io5";
import Tool from "./Tool";
import { useCallback, useState } from "react";
import Button from "@/components/utilities/Button";
import ImageUpload from "../ImageUpload";
import Modal from "../Modal";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import createImageData from "@/lib/actions/image/createImageData";

const ImageUploadTool = ({ editor }) => {
  const [modal, setModal] = useState(false);
  const { edgestore } = useEdgeStore();
  // Image data
  const [img, setImg] = useState({
    url: "",
    alt: "",
  });

  const handleUpload = useCallback(async () => {
    setModal((l) => !l);
    if (img.url) {
      await edgestore.portfolioImages.confirmUpload({
        url: img.url,
      });
      const data = await createImageData({ url: img.url, alt: img.alt });
      editor
        .chain()
        .focus()
        .setImage({
          src: data.url,
          alt: data.alt,
        })
        .run();
    }
  }, [editor, img, edgestore]);

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
        <Button onClick={handleUpload} variant="confirm" size="sm">
          Insert image
        </Button>
      </Modal>
    </>
  );
};

export default ImageUploadTool;
