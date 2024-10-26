import cv from "@techstark/opencv-js";
import { useState } from "react";

export function useProcessImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // Function to set original/soruce image
  const handleSetImageSrc = (newImage: string) => {
    setImageSrc(newImage);
  };

  // Function to crop the image from the center
  const cropFilter = (src: cv.Mat, cropWidth: number, cropHeight: number) => {
    const x = Math.floor((src.cols - cropWidth) / 2); // Center X coordinate
    const y = Math.floor((src.rows - cropHeight) / 2); // Center Y coordinate
    const rect = new cv.Rect(x, y, cropWidth, cropHeight);
    return src.roi(rect); // Crop the image
  };

  // Function to apply the black-and-white (grayscale) filter
  const bwFilter = (src: cv.Mat) => {
    const grayImage = new cv.Mat();
    cv.cvtColor(src, grayImage, cv.COLOR_RGBA2GRAY, 0);
    return grayImage;
  };

  const processImage = (imageSrc: string) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Load the image data into OpenCV
      const src = cv.imread(canvas);

      // Calculate crop dimensions (e.g., 50% of the smallest dimension)
      const cropWidth = Math.min(img.width, img.height) * 0.5;
      // Crop the image from the center
      const croppedImage = cropFilter(src, cropWidth, cropWidth);

      // Apply the black-and-white filter
      const grayImage = bwFilter(croppedImage);

      // Convert grayscale image back to RGBA for browser display
      const finalImage = new cv.Mat();
      cv.cvtColor(grayImage, finalImage, cv.COLOR_GRAY2RGBA);

      // Display the processed image
      cv.imshow(canvas, finalImage);
      setProcessedImage(canvas.toDataURL("image/jpeg"));

      // Cleanup
      src.delete();
      croppedImage.delete();
      grayImage.delete();
      finalImage.delete();
    };
  };

  return {
    imageSrc,
    handleSetImageSrc,
    processedImage,
    processImage,
  };
}
