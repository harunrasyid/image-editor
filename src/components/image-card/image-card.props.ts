import { ReactNode } from "react";

export interface IImageCardProps {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  children?: ReactNode;
  containerClassName?: string;
}
