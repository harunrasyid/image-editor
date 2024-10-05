import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Image Editor",
  description: "OpenCV powered image editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen">
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
