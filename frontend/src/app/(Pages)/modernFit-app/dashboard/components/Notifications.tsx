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
import Link from "next/link";

type notif = {
  _id: string;
  Title: string;
  Description: string;
  createdAt: Date;
  updatedAt: Date;
};

const Notifications: React.FC = () => {
  const { api_url, login, getHeaders } = useAuthContext();
  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/notification/user`, {
        headers,
      });
      return data as notif[];
    },
  });

  const formatDate = (date: Date) => {
    // format as dd/mm/yyyy hh:mm
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <ul className="h-[250px] md:h-[450px] overflow-y-scroll mt-2">
        {data?.map((notification: notif) => (
          <li
            key={notification._id}
            className="bg-blue-100 bg-opacity-50 p-4 mt-3 rounded-xl"
          >
            <div className="notification-head flex font-bold">
              <h3>{notification.Title}</h3>
              <p className="ml-auto text-sm whitespace-nowrap">
                {formatDate(notification.createdAt)}
              </p>
            </div>
            <div>
              <p>{notification.Description.toLowerCase()}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Notifications };
