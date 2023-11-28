"use client";

import React from "react";
import Class from "./class";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import CreateClass from "./CreateClass";
import Modal from "@/app/components/Modal";
import { Button } from "@/app/components/UI/Button";

const CreateClassButton: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { getHeaders, api_url } = useAuthContext();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      {showModal && (
        <Modal closeModal={setShowModal} withRouter={false}>
          <CreateClass setModalOpen={setShowModal} />
        </Modal>
      )}
      <Button
        variant="darkBlue"
        hover="hoverLightBlue"
        shadow="default"
        className="rounded-xl py-6 mt-4"
        size="fillWidth"
        onClick={() => setShowModal(true)}
      >
        Create Class
      </Button>
    </>
  );
};

export default CreateClassButton;
