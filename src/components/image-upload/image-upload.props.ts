export interface IImageUploadProps {
  onDrop(acceptedFiles: File[]): void;
  imageSrc: string | null;
  processedImage: string | null;
  handleDownload(image: string | null): void;
}
