import { ImageCard, InputImage } from "../";
import { IImageUploadProps } from "./image-upload.props";

export const ImageUpload = ({ onDrop, imageSrc }: IImageUploadProps) => {
  return (
    <div className="w-full p-4 flex flex-col items-center">
      {/* Input image */}
      <InputImage onDrop={onDrop} />

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
    </div>
  );
};
