import Image from "next/image";
import { svgs } from "@/assets/svgs";
import { classNames } from "@/utils";
import { ILoadingOverlayProps } from "./loading-overlay.props";

export const LoadingOverlay = ({
  isLoading = false,
  children,
}: ILoadingOverlayProps) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-30",
        !isLoading ? "invisible" : undefined,
      )}
    >
      <Image className="animate-spin" src={svgs.spinner} alt={"loading"} />
      {children}
    </div>
  );
};
