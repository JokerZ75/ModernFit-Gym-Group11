import React from "react";
import Modal from "@/app/components/Modal";
import Register from "../../register/page";
import Recover from "../../recover/page";

const recover: React.FC = () => {
  return (
    <Modal>
      <Recover />
    </Modal>
  );
};

export default recover;
