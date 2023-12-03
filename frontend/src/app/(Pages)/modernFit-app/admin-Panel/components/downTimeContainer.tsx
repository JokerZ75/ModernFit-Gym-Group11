"use client";
import React from "react";
import Modal from "@/app/components/Modal";
import SendDowntime from "./sendDowntime";
import { Button } from "@/app/components/UI/Button";

const DownTimeContainer: React.FC<{ children?: React.ReactNode }> = ({}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      {showModal && (
        <Modal withRouter={false} closeModal={setShowModal}>
          <div className="px-4 py-4">
            <h1 className="text-3xl  font-bold text-blue-200 mb-5">
              Notify of Downtime
            </h1>
            <SendDowntime />
          </div>
        </Modal>
      )}
      <div className="flex flex-col">
        <Button
          shadow="default"
          size="default"
          variant="darkBlue"
          hover="hoverLightBlue"
          rounded="circle"
          className="w-3/4 border mx-auto"
          onClick={() => setShowModal(true)}
        >
          Notify of Downtime
        </Button>
      </div>
    </div>
  );
};

export default DownTimeContainer;
