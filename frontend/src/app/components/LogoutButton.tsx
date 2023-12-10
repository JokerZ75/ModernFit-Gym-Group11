"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/app/components/UI/Button";

const LogoutButton: React.FC = () => {
  const queryClient = useQueryClient();
  const { api_url, getHeaders, logout, getRefreshToken } = useAuthContext();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const headers = await getHeaders();
      const refreshToken = await getRefreshToken();
      await toast.promise(
        axios.post(
          `${api_url}/session/logout`,
          {
            token: refreshToken,
          },
          { headers: headers }
        ),
        {
          pending: "Logging Out...",
          success: "Logged Out!",
          error: "Error Logging Out!",
        }
      );
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      window.location.href = "/";
    },
  });

  return (
    <Button
      variant="default"
      size="fillWidth"
      rounded="circle"
      shadow="shadow2xl"
      hover="default"
      className="md:text-2xl whitespace-nowrap mt-auto "
      onClick={() => mutate()}
    >
      logout
    </Button>
  );
};

export default LogoutButton;
