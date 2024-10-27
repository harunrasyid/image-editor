export interface IImageUploadProps {
  onDrop(acceptedFiles: File[]): void;
  imageSrc: string | null;
}
