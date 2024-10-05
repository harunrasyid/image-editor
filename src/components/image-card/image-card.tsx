import { classNames } from "@/utils";
import { IImageCardProps } from "./image-card.props";

export const ImageCard = ({
  imageSrc,
  imageAlt,
  title,
  children,
  containerClassName,
}: IImageCardProps) => {
  return (
    <div className={classNames("glassmorphism", containerClassName)}>
      {title && (
        <h3 className="mb-4 font-satoshi text-lg text-gray-700">{title}</h3>
      )}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-96 h-auto rounded-lg border object-contain"
      />
      {children}
    </div>
  );
};
