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
      <div>
        <h2>recent workouts</h2>
        {data?.map((workout) => {
          return (
            <div key={workout._id}>
              <p>{workout.Name}</p>
              <p>{workout.Duration}</p>
              <p>{workout.Type_of_workout}</p>
              <p>{workout.Calories_burned}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentWorkouts;
