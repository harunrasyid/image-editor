import { useCallback } from "react";
import { MAX_FILE_SIZE } from "@/config";
import { IInputImageProps } from "../input-image.props";

export function useInputImage({ onImageLoad = () => {} }: IInputImageProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Check if the file exists and has a size property
    if (file && file?.size > MAX_FILE_SIZE) {
      alert("File exceeds the maximum size of 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageLoad(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  return {
    onDrop,
  };
}
