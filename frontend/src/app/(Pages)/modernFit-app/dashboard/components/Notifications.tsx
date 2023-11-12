"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import { Button } from "@/app/components/UI/Button";

type notif = {
  _id: string;
  Title: string;
  Description: string;
  createdAt: Date;
  updatedAt: Date;
};

const getNotifications = async () => {
  const { Headers,api_url } = useAuthContext();
  const { data } = await axios.get(`${api_url}/notification/`, {
    headers: Headers,
  });
  return data as notif[];
};

const Notifications: React.FC = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return (
    <>
      {isError && <p>error</p>}
      <Button variant="default" onClick={() => refetch()}>refetch</Button>
      <h1>Notifications</h1>
      <ul>
        {data?.map((notification: notif) => (
          <li key={notification._id}>{notification.Title}</li>
        ))}
      </ul>
    </>
  );
};

export { Notifications, getNotifications };
