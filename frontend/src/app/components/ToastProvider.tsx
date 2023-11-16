"use client";

import { ToastContainer } from "react-toastify";

const ToastProvider: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-center" pauseOnHover={false} autoClose={3000} closeOnClick={true}/>
    </>
  );
};


export default ToastProvider;