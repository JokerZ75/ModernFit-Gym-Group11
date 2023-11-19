import "@/app/globals.css";
import React from "react";

export default function layout(props: {
  children: React.ReactNode;
  create: React.ReactNode;
}) {
  return (
    <>
      {props.create}
      {props.children}
    </>
  );
}
