"use client";

import ImageUploadComp from "@/components/ImageUploadComp";
import { useState } from "react";

const ImageUploadPage = () => {
  const [thumbnailImage, setThumbnailImage] = useState({});
  return (
    <div>
      <ImageUploadComp size="lg" />
    </div>
  );
};

export default ImageUploadPage;
