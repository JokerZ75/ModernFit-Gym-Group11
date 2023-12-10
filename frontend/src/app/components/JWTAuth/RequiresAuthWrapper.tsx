"use client";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import login from "../../(Pages)/(Landing_Page)/@auth/(.)login/page";
import Link from "next/link";
import { Button } from "../UI/Button";

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

  if (isError) {
    return (
      <div className="flex flex-col min-h-screen text-center px-4">
        <div className="mx-auto my-auto flex flex-col">
          <p className="text-2xl text-blue-200">
            There was an error authenticating you, please try again by
            refreshing the page if you have logged in.
          </p>
          <p>
            Otherwise please try to login again at the home page.
          </p>
          <Link href="/" className="flex mt-2">
            <Button
              variant="default"
              shadow="default"
              rounded="circle"
              className="w-[75%] mx-auto"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
    </>
  );
};

export default RequiresAuthWrapper;
