import RequiresAuthWrapper from "@/app/components/JWTAuth/RequiresAuthWrapper";
import "@/app/globals.css";
import React from "react";

export default function layout(props: { children: React.ReactNode }) {
  return (
    <>
      <RequiresAuthWrapper>{props.children}</RequiresAuthWrapper>
    </>
  );
}
