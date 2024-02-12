"use client";
// packages
import { useId, useState } from "react";
import Image from "next/image";
// components
import Button from "./utilities/Button";
// icons
import { IoImageOutline } from "react-icons/io5";
// others
import cn from "@/lib/cn";
import { focus, input } from "@/theme";
import Alert from "@/lib/config/Alert.config";

const style = {
  base: "rounded font-semibold cursor-pointer shadow",
  outline:
    "border border-gray-50 text-white hover:bg-gray-50 hover:text-accent-color",
  size: {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-1 text-base",
    lg: "px-5 py-2 text-base",
  },
};

const ImageUpload = ({ handleImageData, imageData }) => {
  const inputId = useId();
  const [showImage, setShowImage] = useState(null);

  const handleImage = (e) => {
    const imageObj = e.target.files[0];
    if (imageObj) {
      const imageSize = convertFileSize(imageObj.size);
      if (!imageSize) return;
      handleImageData({
        image: imageObj,
        name: imageObj.name,
        size: imageSize,
        type: imageObj.type,
      });
      const localUrl = URL.createObjectURL(imageObj);
      setShowImage(localUrl);
    }
  };

  const handleRemoveImage = () => {
    setShowImage(null);
    handleImageData({
      image: null,
      name: "",
      size: "",
      type: "",
    });
  };

  return (
    <div className="mx-auto my-4 max-w-96 space-y-2">
      <div className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-700 p-4">
        {showImage ? (
          <>
            <div className="relative overflow-hidden">
              <Image
                className="aspect-video object-cover object-center"
                src={showImage}
                alt="uploaded image"
                width={350}
                height={200}
              />
              <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-end gap-1 bg-gradient-to-b from-transparent via-gray-800/60 to-gray-800/90 p-2 text-xs font-medium">
                <div>Name: {imageData.name}</div>
                <div>Size: {imageData.size}</div>
                <div>Type: {imageData.type}</div>
              </div>
            </div>
            <Button onClick={handleRemoveImage} variant="cancel">
              Remove
            </Button>
          </>
        ) : (
          <>
            <span>
              <IoImageOutline size={50} />
            </span>
            <h6 className="text-xl font-medium">Choose an image</h6>
            <p className="text-sm text-gray-500">Files: png, jpeg, jpg</p>
            <label htmlFor={inputId}>
              <input
                id={inputId}
                type="file"
                name="imageUpload"
                onChange={handleImage}
                accept=".png,.jpeg,.jpg"
                hidden={true}
              />
              <div>
                <span
                  className={`${style.base} ${style.size.lg} ${style.outline}`}
                >
                  Choose image
                </span>
              </div>
            </label>
            <p className="text-sm text-gray-500">Maximum: 5MB</p>
          </>
        )}
      </div>
      {showImage && (
        <>
          <input
            className={cn(input.base, focus.base)}
            value={imageData.name}
            onChange={(e) => handleImageData({ name: e.target.value })}
            placeholder="Image title"
            name="imgTitle"
          />
          <input
            className={cn(input.base, focus.base)}
            value={imageData.alt}
            onChange={(e) => handleImageData({ alt: e.target.value })}
            placeholder="Alt"
            name="alt"
          />
        </>
      )}
    </div>
  );
};

function convertFileSize(inputSize) {
  if (inputSize > 0 && inputSize <= 1000) {
    return `${inputSize} b`;
  } else if (inputSize <= 1000000) {
    return `${inputSize / 1000} kB`;
  } else if (inputSize > 1000000 && inputSize <= 5000000) {
    return `${inputSize / 1000000} MB`;
  } else {
    Alert.fire({
      icon: "error",
      title: "File size too much big!",
    });
    return false;
  }
}

export default ImageUpload;
