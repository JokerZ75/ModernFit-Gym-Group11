import React from "react";
import Modal from "@/app/components/Modal";
import Register from "../../register/page";

const register: React.FC = () => {
    return (
        <Modal>
            <Register />
        </Modal>
    );
};

export default register;