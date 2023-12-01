import React from "react";
import { cookies } from "next/headers";
import axios from "axios";
import GoBackButton from "@/app/components/GoBackButton";

const FormWrapper: React.FC<{
  params: { user: string };
  children: React.ReactNode;
}> = async ({ params, children }) => {
  return (
    <main className="px-8 py-5 md:w-3/4 mx-auto">
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:mb-4">
        <GoBackButton />
        <h1 className="text-2xl text-blue-200 font-bold mb-4 md:my-auto">
          Create Program for {params.user}
        </h1>
      </div>
      <div>{children}</div>
    </main>
  );
};

export default FormWrapper;
