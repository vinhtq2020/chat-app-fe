"use client";
import { use } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import { DotLoading } from "../DotLoading/DotLoading";
import { LoadingScreenContext } from "../../core/client/store/loading/LoadingContext";

export const LoadingScreen = () => {
  const loadingScreenContext = use(LoadingScreenContext);
  return (
    <ReactPortal wrapperId="portal-loading">
      {loadingScreenContext?.isLoading ? (
        <div className="fixed inset-0 ">
          <div className="absolute h-full w-full bg-black opacity-50"></div>
          <div className="absolute bottom-[24%] w-full flex items-center justify-center">
            <DotLoading />
          </div>
        </div>
      ) : null}
    </ReactPortal>
  );
};
