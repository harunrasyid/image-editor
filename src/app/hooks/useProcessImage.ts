import cv from "@techstark/opencv-js";
import { useEffect, useState } from "react";

export function useProcessImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [saturation, setSaturation] = useState<number>(0); // Saturation control

  // Set source image
  const handleSetImageSrc = (newImage: string) => {
    setImageSrc(newImage);
  };

  // Adjust zoom level
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  // Adjust saturation level
  const handleSaturationChange = (newSaturation: number) => {
    setSaturation(newSaturation);
  };

  // Set processed image
  const handleSetProcessedImage = (newProcessed: string) => {
    setProcessedImage(newProcessed);
  };

  // Zoom function to apply to the image
  const zoomImage = (src: cv.Mat, zoomLevel: number): cv.Mat => {
    const width = src.cols;
    const height = src.rows;

    const zoomRect = new cv.Rect(
      width / 2 - width / (2 * zoomLevel),
      height / 2 - height / (2 * zoomLevel),
      width / zoomLevel,
      height / zoomLevel,
    );

    const zoomedMat = src.roi(zoomRect);
    const resizedMat = new cv.Mat();
    cv.resize(
      zoomedMat,
      resizedMat,
      new cv.Size(width, height),
      0,
      0,
      cv.INTER_LINEAR,
    );

    zoomedMat.delete(); // Free memory
    return resizedMat;
  };

  // Function to adjust the saturation of the image
  const changeSaturation = (src: cv.Mat, saturationLevel: number): cv.Mat => {
    const hsvMat = new cv.Mat();
    cv.cvtColor(src, hsvMat, cv.COLOR_RGB2HSV);

    // Scale saturation
    const channels = new cv.MatVector();
    cv.split(hsvMat, channels);
    channels.get(1).convertTo(channels.get(1), -1, saturationLevel); // Adjust the saturation channel
    cv.merge(channels, hsvMat);
    channels.delete();

    const resultMat = new cv.Mat();
    cv.cvtColor(hsvMat, resultMat, cv.COLOR_HSV2RGB);

    hsvMat.delete(); // Free memory
    return resultMat;
  };

  // Process image with both transformations if necessary
  const processImage = async (
    imageSrc: string,
    zoomLevel: number,
    saturationLevel: number,
  ) => {
    const img = new Image();
    img.src = imageSrc;

    await new Promise<void>((resolve) => (img.onload = () => resolve()));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);

    let src = cv.imread(canvas);

    // Apply transformations independently
    if (zoomLevel !== 1) {
      src = zoomImage(src, zoomLevel);
    }
    if (saturationLevel !== 1) {
      const saturatedMat = changeSaturation(src, saturationLevel);
      src.delete(); // Free previous mat
      src = saturatedMat;
    }

    cv.imshow(canvas, src);
    setProcessedImage(canvas.toDataURL("image/jpeg"));

    src.delete(); // Clean up
  };

  useEffect(() => {
    if (imageSrc) processImage(imageSrc, zoom, saturation);
  }, [imageSrc, zoom, saturation, processImage]);

  return {
    imageSrc,
    handleSetImageSrc,
    processedImage,
    handleSetProcessedImage,
    zoom,
    handleZoomChange,
    saturation,
    handleSaturationChange,
  };
}
