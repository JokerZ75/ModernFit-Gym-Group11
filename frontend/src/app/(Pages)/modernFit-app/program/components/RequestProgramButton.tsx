"use client";
import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/app/components/UI/Button";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const RequestProgramButton: React.FC = () => {
  const { getHeaders, api_url } = useAuthContext();

  const { mutate } = useMutation({
    mutationKey: ["requestProgram"],
    mutationFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.post(
        `${api_url}/program-request/`,
        {},
        {
          headers: headers,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.msg === "Program request made") {
        toast.success("Program requested");
      }
      if (data?.msg === "Program already requested") {
        toast.info("Program already requested");
      }
    },
    onError: (error: AxiosError) => {
      // @ts-expect-error
      if (error.response?.data?.msg === "Profile not finished") {
        toast.error(
          "Please set your Branch, Height, Weight and Gym Goals on your profile page"
        );
      }
      // @ts-expect-error
      if (error.response?.data?.msg === "Program request already made") {
        toast.info("Program already requested");
      }
    },
  });

  return (
    <Button
      variant="darkBlue"
      hover="hoverLightBlue"
      shadow="default"
      size="fillWidth"
      className="rounded-xl mx-auto py-3"
      onClick={() => mutate()}
    >
      request program
    </Button>
  );
};

export default RequestProgramButton;
