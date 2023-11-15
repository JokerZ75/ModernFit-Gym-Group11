"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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
          hover="default"
          className="absolute right-0 mr-2 mt-1 bg-transparent text-orange-100 text-5xl"
          onClick={() => {
            Router.back();
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </Button>
        <div className="bg-white rounded-lg"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
