"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Modal: React.FC<{
  children: React.ReactNode;
  closeModal?: React.Dispatch<boolean>;
  withRouter?: boolean;
}> = ({ children, closeModal, withRouter = true }) => {
  const Router = useRouter();
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[50%]">
        {withRouter ? (
          <Button
            variant="default"
            size="default"
            rounded="default"
            className=" absolute right-[2.5%] md:right-[25%] mr-2 mt-1 bg-transparent text-orange-100 hover:text-orange-200 text-5xl"
            onClick={() => {
              Router.back();
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </Button>
        ) : (
          <Button
            variant="default"
            size="default"
            rounded="default"
            className="absolute right-[2.5%] md:right-[25%] mr-2 mt-1 bg-transparent text-orange-100 hover:text-orange-200 text-5xl"
            onClick={() => {
              closeModal && closeModal(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </Button>
        )}

        <div className="bg-white rounded-lg"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
