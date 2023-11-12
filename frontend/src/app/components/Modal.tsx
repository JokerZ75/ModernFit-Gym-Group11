"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./UI/Button";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const Router = useRouter();

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[90%]">
        <Button
          variant="default"
          size="default"
          rounded="default"
          shadow="shadowLg"
          hover="default"
          className=" text-black"
          onClick={() => {
            Router.back();
          }}
        >
          X
        </Button>
        <div className="bg-white p-5 rounded-lg"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
