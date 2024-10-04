"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cv from "@techstark/opencv-js";

export const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const maxSize = 2 * 1024 * 1024; // 2MB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > maxSize) {
      alert("File exceeds the maximum size of 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      processImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxSize: maxSize,
  });

  const processImage = (imageSrc: string) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Accessing image data for OpenCV processing
      const src = cv.imread(canvas);
      const dst = new cv.Mat();

      // Apply simple filter (e.g., grayscale)
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);

      // Resize image for example
      const dsize = new cv.Size(200, 200); // Example size
      cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);

      cv.imshow(canvas, dst);
      setProcessedImage(canvas.toDataURL("image/jpeg"));

      // Cleanup
      src.delete();
      dst.delete();
    };
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement("a");
    a.href = processedImage;
    a.download = "processed_image.jpg";
    a.click();
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border-2 border-dashed p-4 w-full h-64 flex items-center justify-center"
      >
        <input {...getInputProps()} />
        <p>Drag drop an image here, or click to select one</p>
      </div>

      {imageSrc && (
        <div className="mt-4">
          <h3>Original Image</h3>
          <img src={imageSrc} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}

      {processedImage && (
        <div className="mt-4">
          <h3>Processed Image</h3>
          <img
            src={processedImage}
            alt="Processed"
            className="max-w-full h-auto"
          />
          <button
            onClick={handleDownload}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Download Processed Image
          </button>
        </div>
      )}
    </div>
  );
};
