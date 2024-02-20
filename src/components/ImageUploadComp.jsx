"use client";
import cn from "@/lib/cn";
import { focus, input } from "@/theme";
import { IoImageOutline } from "react-icons/io5";
import Button from "./utilities/Button";
import Image from "next/image";
import { useId, useState } from "react";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import { GoVerified } from "react-icons/go";
import Spinner from "./Spinner";

const style = {
  base: "rounded font-semibold cursor-pointer shadow",
  outline:
    "border border-gray-50 text-white hover:bg-gray-50 hover:text-accent-color",
  size: {
    main: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
    },
    image: {
      sm: {
        width: 368,
        height: 207,
      },
      md: {
        width: 432,
        height: 243,
      },
      lg: {
        width: 656,
        height: 369,
      },
    },
    button: {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-1 text-base",
      lg: "px-5 py-2 text-base",
    },
  },
};

const ImageUploadComp = ({ size = "md", folder, setImageData }) => {
  const { edgestore } = useEdgeStore();
  const inputId = useId();
  const [showImage, setShowImage] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");
  const [img, setImg] = useState({
    image: null,
    name: "",
    size: "",
    type: "",
    alt: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [tempLink, setTempLink] = useState("");
  const [spinner, setSpinner] = useState(false);

  //functions
  const handleRemoveImage = () => {
    setShowImage(null);
    setImg({
      image: null,
      name: "",
      size: "",
      type: "",
      alt: "",
    });
  };

  const handleUploadImage = async () => {
    setUploading(true);
    setUploadingStatus("uploading");
    const res = await edgestore.portfolioImages.upload({
      file: img.image,
      input: { type: folder },
      options: {
        temporary: true,
      },
      onProgressChange: (progress) => setProgress(progress),
    });
    setUploadingStatus("uploaded");
    setTempLink(res.url);
  };

  const handleConfirm = async () => {
    setSpinner(true);
    await edgestore.portfolioImages.confirmUpload({
      url: tempLink,
    });
    setImageData({
      status: "uploaded",
      url: tempLink,
      alt: img.alt,
    });
    setUploadingStatus("confirm");
    setSpinner(false);
  };
  const handleDelete = async () => {
    setSpinner(true);
    await edgestore.portfolioImages.delete({
      url: tempLink,
    });
    handleRemoveImage();
    setUploadingStatus("");
    setSpinner(false);
    setUploading(false);
  };

  const handleShowImage = (e) => {
    const imageObj = e.target.files[0];
    if (imageObj) {
      const imageSize = convertFileSize(imageObj.size);
      if (!imageSize) {
        setErrorStatus("File size too much big!");
        return;
      }
      setImg({
        image: imageObj,
        name: imageObj.name,
        size: imageSize,
        type: imageObj.type,
        alt: "",
      });
      const localUrl = URL.createObjectURL(imageObj);
      setShowImage(localUrl);
    }
  };

  return (
    <div className={cn("mx-auto my-4 w-full space-y-2", style.size.main[size])}>
      <div className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-700 p-4">
        {showImage ? (
          <>
            <div className="relative overflow-hidden">
              <Image
                className="aspect-video object-cover object-center"
                src={showImage}
                alt="uploaded image"
                width={style.size.image[size].width}
                height={style.size.image[size].height}
              />
              <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-end gap-1 bg-gradient-to-b from-transparent via-gray-800/60 to-gray-800/90 p-2 text-xs font-medium">
                <div>Name: {img.name}</div>
                <div>Size: {img.size}</div>
                <div>Type: {img.type}</div>
                <div>
                  Alt:{" "}
                  {img.alt || (
                    <span className="italic text-gray-400">Empty</span>
                  )}
                </div>
              </div>
            </div>
            {errorStatus && (
              <p className="mt-1 text-xs text-red-500">{errorStatus}</p>
            )}
            {uploading ? (
              <div className="w-full rounded-md border border-gray-700 p-2">
                <div className="flex items-center justify-between">
                  {uploadingStatus === "uploading" ? (
                    <div className="text-lg font-semibold">Uploading....</div>
                  ) : (
                    <div>
                      <div className="leading-tight">
                        {img.name}.
                        {img.type.replace("image/", "").toLowerCase()}
                      </div>
                      <div className="text-xs leading-tight text-gray-400">
                        Uploaded{" "}
                        {uploadingStatus === "confirm" && (
                          <span className="ml-2">Confirmed</span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="inline-flex items-center gap-2">
                    {uploadingStatus === "uploading" ? (
                      <span>{progress}%</span>
                    ) : uploadingStatus === "uploaded" ? (
                      <>
                        <Button
                          disabled={spinner}
                          onClick={handleConfirm}
                          variant="confirm"
                          size="sm"
                        >
                          {spinner ? <Spinner size={15} /> : "Confirm"}
                        </Button>
                        <Button
                          disabled={spinner}
                          onClick={handleDelete}
                          variant="cancel"
                          size="sm"
                        >
                          {spinner ? <Spinner size={15} /> : "Delete"}
                        </Button>
                      </>
                    ) : (
                      <div>
                        <GoVerified size={25} />
                      </div>
                    )}
                  </div>
                </div>
                {uploadingStatus === "uploading" && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-md border border-gray-400 transition-all duration-200">
                    <div
                      className="h-1.5 bg-gray-400"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  className={cn(
                    input.base,
                    focus.base,
                    size === "sm" && "px-2 py-1",
                  )}
                  value={img.name}
                  onChange={(e) => setImg({ ...img, name: e.target.value })}
                  placeholder="Image title"
                  name="imgTitle"
                />
                <input
                  type="text"
                  className={cn(
                    input.base,
                    focus.base,
                    size === "sm" && "px-2 py-1",
                  )}
                  value={img.alt}
                  onChange={(e) => setImg({ ...img, alt: e.target.value })}
                  placeholder="Alt"
                  name="imgAlt"
                />
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={handleRemoveImage}
                    variant="cancel"
                  >
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUploadImage}
                    variant="confirm"
                  >
                    Upload
                  </Button>
                </div>
              </>
            )}
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
                onChange={handleShowImage}
                accept="image/*"
                hidden={true}
              />
              <div>
                <span
                  className={cn(
                    style.base,
                    style.size.button[size],
                    style.outline,
                  )}
                >
                  Choose image
                </span>
              </div>
            </label>
            <p className="text-sm text-gray-500">Maximum: 5MB</p>
            {errorStatus && (
              <p className="mt-1 text-xs text-red-500">{errorStatus}</p>
            )}
          </>
        )}
      </div>
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
    return false;
  }
}

export default ImageUploadComp;
