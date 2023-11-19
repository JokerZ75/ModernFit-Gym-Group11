import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

const Register: React.FC = () => {
  return (
    <>
    
      <div className="px-5 py-5">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2">
          <h1>register</h1>
        </div>
        <RegisterForm />
        <Link href="/login" className="flex">
          <Button
            type="button"
            shadow="default"
            size="default"
            variant="lightBlue"
            hover="hoverDarkBlue"
            rounded="circle"
            className="w-3/4 border mx-auto"
          >
            Login
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Register;
