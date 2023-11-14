"use client";

import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";

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

const RecentWorkouts: React.FC = () => {
  const { api_url, getHeaders } = useAuthContext();
  const { data } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/workout/user`, {
        headers: headers,
      });
      return data as workout[];
    },
  });

  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">recent workouts</h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {data?.map((workout) => {
              return (
                <li className="mt-3 first:mt-0" key={workout._id}>
                  <Workout workout={workout} />
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="darkBlue"
          shadow="default"
          rounded="square"
          className=" mx-auto rounded-xl mt-4 py-4"
          hover="hoverLightBlue"
          size="fillWidth"
        >
          add workout
        </Button>
      </div>
    </>
  );
};

const Workout: React.FC<{ workout: workout }> = ({ workout }) => {
  const { api_url, getHeaders } = useAuthContext();
  const { data: workoutType } = useQuery({
    queryKey: ["workoutType"],
    queryFn: async () => {
      const header = await getHeaders();
      const { data } = await axios.get(`${api_url}/typeofworkout/`, {
        headers: header,
      });
      return data as any[];
    },
  });

  return (
    <div className="bg-blue-200 bg-opacity-50 rounded-xl p-2 ">
      <div className="flex">
        <p className="text-2xl font-bold text-white">{workout.Name}</p>
        <p className="ml-auto text-xl font-bold text-white">
          {workout.Duration} min
        </p>
      </div>
      <p className="font-bold">
        {workoutType?.find((type) => type._id === workout.Type_of_workout).Name}
      </p>
      <p className="font-bold">{workout.Calories_burned} Kcal</p>
    </div>
  );
};

export default RecentWorkouts;
