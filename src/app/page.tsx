"use client";
import { ImageUpload, LoadingOverlay } from "@/components";
import { useLoading } from "@/hooks";
import { useDownloadImage, useInputImage, useProcessImage } from "./hooks";

export default function Home() {
  const { isLoading, setLoading } = useLoading();
  const { imageSrc, handleSetImageSrc, processedImage, processImage } =
    useProcessImage();
  const { handleDownload } = useDownloadImage({
    setLoading,
  });

  const handleImageLoad = (newImage: string) => {
    try {
      setLoading(true);
      handleSetImageSrc(newImage);
      processImage(newImage);
    } catch (e) {
      alert(`Failed to load image ${e}`);
    } finally {
      setLoading(false);
    }
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

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </section>
  );
}
