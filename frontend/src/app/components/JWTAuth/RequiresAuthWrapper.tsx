"use client";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const RequiresAuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getHeaders, verify_api_endpoint, redirectTo } = useAuthContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const Headers = await getHeaders();
      const { data } = await axios.post(
        verify_api_endpoint,
        {},
        {
          headers: Headers,
        }
      );
      return data;
    },
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });

  const redirect = () => {
    document.location.href = redirectTo;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col min-h-screen">
          <div className="mx-auto my-auto flex flex-col">
            <p className="text-2xl text-blue-200 animate-pulse ">
              Loading and Authenticating...
            </p>
            <div className="loading-circle mx-auto"></div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
      {isError && redirect()}
    </>
  );
};

export default RequiresAuthWrapper;
