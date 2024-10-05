export function useDownloadImage() {
  const handleDownload = (image: string | null) => {
    if (!image) return;
    const a = document.createElement("a");
    a.href = image;
    a.download = `${new Date().toString()}_processed_image.jpg"`;
    a.click();
  };

  return {
    handleDownload,
  };
}
