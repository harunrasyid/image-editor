import { useDropzone } from "react-dropzone";
import { ACCEPTED_FILE_TYPE } from "@/config";
import { IInputImageProps } from "./input-image.props";

export const InputImage = ({ onDrop }: IInputImageProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": ACCEPTED_FILE_TYPE,
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="min-w-0.5 flex items-center justify-center glassmorphism"
    >
      <input {...getInputProps()} />
      <p className="desc text-center">
        Drag drop an image here, or click to select one
      </p>
    </div>
  );
};
