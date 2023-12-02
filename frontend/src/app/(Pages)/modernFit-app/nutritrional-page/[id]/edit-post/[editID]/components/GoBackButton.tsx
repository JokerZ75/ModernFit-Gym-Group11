"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/UI/Button";

const GoBackButton: React.FC = () => {
  const Router = useRouter();
  return (
    <Button
      variant="default"
      size="default"
      rounded="default"
      className=""
      onClick={() => {
        Router.push("../")
      }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;