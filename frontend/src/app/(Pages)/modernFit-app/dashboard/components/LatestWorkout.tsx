"use client";

import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/app/components/UI/Button";

type workout = {
  _id?: string;
  User_id: string;
  Name: string;
  Duration: number;
  Type_of_workout: string;
  Calories_burned: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const LatestWorkout: React.FC = () => {
  const { api_url, getHeaders } = useAuthContext();

  React.useEffect(() => {}, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const header = await getHeaders();
      const { data } = await axios.get(`${api_url}/workout/user`, {
        headers: header,
      });
      return data as workout[];
    },
  });

  let workout: workout | undefined;
  if (!isLoading) {
    workout = data?.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(a.createdAt as Date).getDate() -
          new Date(b.createdAt as Date).getDate()
        );
      }
      return 0;
    })[data.length - 1];
  }

  const {
    data: workoutType,
    isLoading: typeLoading,
    isError: typeError,
  } = useQuery({
    queryKey: ["workoutType"],
    queryFn: async () => {
      const header = await getHeaders();
      const { data } = await axios.get(
        `${api_url}/typeofworkout/${workout?.Type_of_workout}`,
        {
          headers: header,
        }
      );
      return data as any;
    },
    enabled: workout != undefined,
  });

  if (workout == undefined)
    return (
      <div className="flex flex-col text-xl">
        <p className="mx-auto">You havent logged any workouts yet.</p>
        <p className="mx-auto">Log some on the diary page</p>
        <Link href="/modernFit-app/activity-diary" passHref>
          <Button
            variant="default"
            hover="default"
            shadow="default"
            rounded="circle"
            size="fillWidth"
            className="mx-auto mt-4 py-3"
          >
            go to diary
          </Button>
        </Link>
      </div>
    );
  if (isLoading || typeLoading)
    return <div className="loading-skeleton !h-[150px]"></div>;
  if (isError || typeError)
    return <div>Error has occured please try again later</div>;
  return (
    <>
      <p className="text-center font-bold text-3xl md:text-4xl">
        type: {workout?.Name.toLocaleLowerCase()}
      </p>
      <p className="text-center font-bold text-3xl md:text-4xl">
        duration: {workout?.Duration}
      </p>
      <p className="text-center font-bold text-3xl md:text-4xl">
        cals burnt: {workout?.Calories_burned}
      </p>
    </>
  );
};

export default LatestWorkout;
