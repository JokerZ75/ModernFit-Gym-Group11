import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <div className="px-5 py-5 md:w-2/3 mx-auto">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2">
          <h1>login</h1>
        </div>
        <LoginForm />
        <div className="text-center">
          <Link href="/register" passHref>
            <Button
              type="button"
              shadow="default"
              size="default"
              variant="lightBlue"
              hover="hoverDarkBlue"
              rounded="circle"
              className="w-3/4 border mx-auto"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}  

export default Login;
