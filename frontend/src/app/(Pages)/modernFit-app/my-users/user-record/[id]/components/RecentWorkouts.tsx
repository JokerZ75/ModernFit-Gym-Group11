import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const RecentWorkouts: React.FC<{
  data: workout[];
  workoutTypes: workoutType[];
}> = ({ data, workoutTypes }) => {
  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">recent workouts</h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {data?.map((workout) => {
              return (
                <li className="mt-3 first:mt-0" key={workout._id}>
                  <Workout workout={workout} workoutType={workoutTypes} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

type workoutType = {
  _id: string;
  Name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Workout: React.FC<{ workout: workout; workoutType: workoutType[] }> = ({
  workout,
  workoutType,
}) => {
  return (
    <div className="bg-blue-200 bg-opacity-50 rounded-xl p-2 ">
      <div className="flex">
        <p className="text-2xl font-bold text-white">{workout.Name}</p>
        <p className="ml-auto text-xl font-bold text-white">
          {workout.Duration} min
        </p>
      </div>
      <p className="font-bold">
        {
          workoutType?.find((type) => type._id === workout.Type_of_workout)
            ?.Name
        }
      </p>
      <p className="font-bold">{workout.Calories_burned} Kcal</p>
    </div>
  );
};

export default RecentWorkouts;
