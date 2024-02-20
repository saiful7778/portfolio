"use client";

import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

const ImageUploadPage = () => {
  const [thumbnailImage, setThumbnailImage] = useState({
    status: "",
    url: "",
    alt: "",
  });
  console.log(thumbnailImage);
  return (
    <div>
      <ImageUpload
        size="lg"
        folder="project"
        setImageData={setThumbnailImage}
      />
    </div>
  );
};

export default ImageUploadPage;
