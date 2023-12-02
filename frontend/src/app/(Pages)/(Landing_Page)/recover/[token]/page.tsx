import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import RecoverForm from "./components/RecoverForm";

const Recover: React.FC<{
  params: {
    token: string;
  };
}> = ({ params }) => {
  return (
    <>
      <div className="px-5 py-5 md:w-2/3 mx-auto">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2">
          <h1>recover</h1>
        </div>
        <RecoverForm token={params.token} />
        <div className="text-center">
          <Link href="/login" passHref>
            <Button
              type="button"
              shadow="default"
              size="default"
              variant="lightBlue"
              hover="hoverDarkBlue"
              rounded="circle"
              className="w-3/4 border mx-auto"
            >
              login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Recover;
