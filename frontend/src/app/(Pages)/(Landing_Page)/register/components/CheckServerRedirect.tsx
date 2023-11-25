"use client";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";

const CheckServerRedirect: React.FC<{ cookie: string | undefined }> = ({
  cookie,
}) => {
  const { api_url, getHeaders, login } = useAuthContext();

  const { mutate: LoginToSystem } = useMutation({
    mutationKey: ["LoginToSystem"],
    mutationFn: async (emailPasswordToken: any) => {
      const headers = await getHeaders();
      const { data } = await toast.promise(
        axios.post(
          `${api_url}/session/registerlogin`,
          {
            email: emailPasswordToken.email,
            password: emailPasswordToken.password,
            token: emailPasswordToken.token,
          },
          {
            headers: headers,
          }
        ),
        {
          pending: "Logging in",
          success: "Logged in",
          error: "Failed to login",
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      document.cookie =
        "user-details=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      login(data);
      setTimeout(() => {
        window.location.href = "/modernFit-app/dashboard";
      }, 2000);
    },
  });

  useEffect(() => {
    if (
      cookie &&
      cookie?.split(":").length > 1 &&
      cookie?.split(",").length == 3
    ) {
      const data = cookie?.split(":");
      const email = data[1].replace(/"/g, "").split(",")[0];
      const password = data[2].replace(/"/g, "").split(",")[0];
      const token = data[3].replace(/"/g, "").replace("}", "");
      LoginToSystem({ email, password, token });
    }
  }, []);
  return <></>;
};

export default CheckServerRedirect;
