"use client";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const RequiresAuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { Headers, verify_api_endpoint, redirectTo } = useAuthContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      console.log(Headers);
      await axios
        .post(`${verify_api_endpoint}`, {}, { headers: Headers })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {});
    },
  });

  const redirect = () => {
    document.location.href = redirectTo;
  };

  return (
    <>
      {isLoading ? <></> :<>{children}</> }
      {isError && redirect()}
    </>
  );
};

export default RequiresAuthWrapper;
