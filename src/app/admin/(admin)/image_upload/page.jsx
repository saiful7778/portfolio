"use client";

import ImageUploadComp from "@/components/ImageUploadComp";
import { useState } from "react";

const ImageUploadPage = () => {
  const [thumbnailImage, setThumbnailImage] = useState({
    status: "",
    url: "",
    alt: "",
  });
  return (
    <div>
      <ImageUploadComp
        size="lg"
        folder="project"
        setImageData={setThumbnailImage}
      />
    </div>
  );
};

export default ImageUploadPage;
