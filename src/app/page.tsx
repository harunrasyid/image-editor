import { ImageUpload } from "@/components";

export default function Home() {
  return (
    <section className="flex-center flex-col">
      <h1 className="head_text text-center">
        OpenCV Powered
        <br />
        <span className="text-center orange_gradient">Image Editor</span>
      </h1>

      {/* Spacer */}
      <div className="mb-8" />

      {/* Upload Image */}
      <ImageUpload />
    </section>
  );
}
