"use client";

import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDayMonth, formatHourMinute } from "@/app/utils/dateFormat";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Date: Date;
  Time: Date;
  Duration: number;
  Branch_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const UpcomingClasses: React.FC = () => {
  const { api_url, getHeaders } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["upcomingclasses"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/class/user`, {
        headers: headers,
      });
      if (data?.msg == "No classes") return data;
      data
        ?.sort((a: classType, b: classType) => {
          return a.Date > b.Date ? 1 : -1;
        })
        ?.reverse();
      return data?.splice(0, 3);
    },
  });

  if (data?.msg == "No classes")
    return (
      <div className="flex flex-col text-xl">
        <p className="mx-auto ">No upcoming classes</p>
        <p className="mx-auto">Join some on the classes page</p>
        <Link href="/modernFit-app/classes" passHref>
          <Button
            variant="default"
            hover="default"
            shadow="default"
            rounded="circle"
            size="fillWidth"
            className="mx-auto mt-4 py-3"
          >
            go to classes
          </Button>
        </Link>
      </div>
    );
  if (isLoading) return <div className="loading-skeleton !h-[100px]"></div>;
  if (error)
    return (
      <div className="text-red-500 font-bold">
        An error has occured, please try again later
      </div>
    );

  return (
    <>
      {data?.map((item: classType) => {
        return (
          <div
            key={item._id}
            className="flex items-center justify-center text-xl md:text-5xl"
          >
            <p className="text-center font-bold ">{item.Name}</p>
            <p className="text-center font-bold ml-6">
              {formatDayMonth(item.Date)}
            </p>
            <p className="text-center font-bold ml-2">
              {formatHourMinute(item.Time)}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default UpcomingClasses;
