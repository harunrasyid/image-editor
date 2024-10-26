"use client";
import { ImageUpload } from "@/components";
import { useDownloadImage, useInputImage, useProcessImage } from "./hooks";

export default function Home() {
  const { imageSrc, handleSetImageSrc, processedImage, processImage } =
    useProcessImage();
  const { handleDownload } = useDownloadImage();

  const handleImageLoad = (newImage: string) => {
    handleSetImageSrc(newImage);
    processImage(newImage);
  };

  const { onDrop } = useInputImage({
    onImageLoad: handleImageLoad,
  });

  return (
    <section className="flex-center flex-col">
      <h1 className="head_text text-center">
        OpenCV Powered
        <br />
        <span className="text-center orange_gradient">Image Editor</span>
      </h1>

      {/* Spacer */}
      <div className="mb-8" />

      {/* Upload Image */}
      <ImageUpload
        imageSrc={imageSrc}
        processedImage={processedImage}
        onDrop={onDrop}
        handleDownload={handleDownload}
      />
    </section>
  );
}
