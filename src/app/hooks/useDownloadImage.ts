interface IUseDownloadImageProps {
  setLoading?(newLoad: boolean): void;
}

export function useDownloadImage({ setLoading }: IUseDownloadImageProps) {
  const handleDownload = (image: string | null) => {
    try {
      setLoading?.(true);
      if (!image) return;
      const a = document.createElement("a");
      a.href = image;
      a.download = `${new Date().toString()}_processed_image.jpg"`;
      a.click();
    } catch (e) {
      alert(`Failed to download image: ${e}`);
    } finally {
      setLoading?.(false);
    }
  };

  return {
    handleDownload,
  };
}
