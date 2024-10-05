"use client";
import { ImageCard, InputImage } from "@/components";
import { useDownloadImage, useProcessImage } from "./hooks";

export const ImageUpload = () => {
  const { imageSrc, handleSetImageSrc, processedImage, processImage } =
    useProcessImage();
  const { handleDownload } = useDownloadImage();

  return (
    <div className="w-full p-4 flex flex-col items-center">
      {/* Input image */}
      <InputImage
        onImageLoad={(newImage) => {
          handleSetImageSrc(newImage);
          processImage(newImage);
        }}
      />

      {/* Spacer */}
      <div className="mb-8" />

      {/* Original Image */}
      {imageSrc && (
        <ImageCard
          imageSrc={imageSrc}
          imageAlt={"original-image"}
          title={"Original Image"}
        />
      )}

      {/* Spacer */}
      <div className="mb-8" />

      {/* Processed Image */}
      {processedImage && (
        <ImageCard
          imageSrc={processedImage}
          imageAlt={"processed-image"}
          title={"Processed Image"}
          containerClassName={"!border-primary-orange !border-2"}
        >
          <button
            onClick={() => handleDownload(processedImage)}
            className="mt-4 w-full outline_btn"
          >
            Download Processed Image
          </button>
        </ImageCard>
      )}
    </div>
  );
};
