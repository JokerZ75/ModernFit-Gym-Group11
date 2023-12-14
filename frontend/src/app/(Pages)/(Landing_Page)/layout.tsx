import React from "react";

export default function layout(props: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <>
      {props.auth}
      {props.children}
    </>
  );
}
