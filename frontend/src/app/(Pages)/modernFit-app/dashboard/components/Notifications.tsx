"use client";

import React from "react";
import {
  useQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios, { AxiosHeaders } from "axios";
import { Button } from "@/app/components/UI/Button";
import { get } from "http";

type notif = {
  _id: string;
  Title: string;
  Description: string;
  createdAt: Date;
  updatedAt: Date;
};

const getNotifications = async ({
  api_url,
  Headers,
}: {
  api_url: string;
  Headers: {};
}) => {
  const { data } = await axios.get(`${api_url}/notification/`, {
    headers: Headers,
  });
  return data as notif[];
};

const Notifications: React.FC = () => {
  const { Headers, api_url, login } = useAuthContext();

  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications({ api_url, Headers }),
  });
  React.useEffect(() => {
    login({
      tokenType: "Bearer",
      refreshToken: "hhjwie",
      accessToken: "jwioe",
    });
  }, []);
  console.log(isLoading);
  return (
    <>
      {isError && <p>error</p>}
      <Button variant="default" onClick={() => refetch()}>
        refetch
      </Button>
      <ul>
        {data?.map((notification: notif) => (
          <li key={notification._id}>{notification.Title}</li>
        ))}
      </ul>
    </>
  );
};

export { Notifications, getNotifications };
