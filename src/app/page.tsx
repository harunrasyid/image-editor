"use client";
import {
  ImageCard,
  ImageUpload,
  LoadingOverlay,
  RangeInput,
} from "@/components";
import { useLoading } from "@/hooks";
import { useDownloadImage, useInputImage, useProcessImage } from "./hooks";

export default function Home() {
  const { isLoading, setLoading } = useLoading();
  const {
    imageSrc,
    handleSetImageSrc,
    processedImage,
    handleSetProcessedImage,
    zoom,
    handleZoomChange,
    saturation,
    handleSaturationChange,
  } = useProcessImage();
  const { handleDownload } = useDownloadImage({
    setLoading,
  });

  const handleImageLoad = (newImage: string) => {
    try {
      setLoading(true);
      handleSetImageSrc(newImage);
      handleSetProcessedImage(newImage);
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
      <ImageUpload imageSrc={imageSrc} onDrop={onDrop} />

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
          {/* Spacer */}
          <div className="mb-4" />

          {/* Adjust Zoom */}
          <RangeInput
            id="zoom-range"
            label={"Zoom"}
            value={zoom}
            onChange={handleZoomChange}
            min={1}
            max={10}
            step={0.1}
          />

          {/* Adjust Saturation */}
          <RangeInput
            id="saturation-range"
            label={"Saturation"}
            value={saturation}
            onChange={handleSaturationChange}
            min={0}
            max={2}
            step={0.1}
          />

          {/* Spacer */}
          <div className="mb-4" />

          {/* Download button */}
          <button
            onClick={() => handleDownload(processedImage)}
            className="mt-4 w-full outline_btn"
          >
            Download Processed Image
          </button>
        </ImageCard>
      )}

      {/* Spacer */}
      <div className="mb-8" />

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </section>
  );
}
