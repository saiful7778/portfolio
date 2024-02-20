"use client";

import ImageUploadComp from "@/components/ImageUploadComp";
import { useState } from "react";

const ImageUploadPage = () => {
  const [thumbnailImage, setThumbnailImage] = useState({});
  return (
    <div>
      <ImageUploadComp size="lg" folder="project" />
    </div>
  );
};

export default ImageUploadPage;
