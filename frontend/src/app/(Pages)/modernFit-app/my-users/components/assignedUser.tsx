"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type props = {
  user: userType;
};

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const AssignedUser: React.FC<props> = ({ user }) => {
  const [goals, setGoals] = useState<string>(user.Gym_Goals);
  if (goals.length > 30) {
    setGoals((old) => old.slice(0, 30) + "...");
  }

  React.useEffect(() => {
    axios
      .get(`${user.Profile_picture}`)
      .then((res) => {})
      .catch((err) => {
        user.Profile_picture = "https://placehold.co/300x300";
      });
  }, []);

  return (
    <div className="max-w-sm w-full mx-auto mb-3 bg-blue-100 rounded-xl p-3">
      <div className="flex">
        <img
          src={user.Profile_picture}
          alt="Profile Picture"
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <div className="mx-auto w-3/4 ml-5">
          <p className="text-white text-xl">{user.Name}</p>
          <p className="text-black text-lg">
            {user.Height} {user.Weight}lbs
          </p>
        </div>
      </div>
      <div className="mx-auto w-5/6">
        <div className="text-black">
          {user.Name}&#39;s gym goals are: {goals}
        </div>
        <div className="text-white font-bold underline hover:text-orange-100 transition-all duration-500">
          <Link href={`/modernFit-app/my-users/user-record/${user._id}`}>
            View Records
          </Link>
        </div>
        <div className="text-center">
          <Button
            shadow="default"
            size="fillWidth"
            variant="darkBlue"
            hover="default"
            className="rounded-lg mx-auto text-center m-1"
          >
            Create Program
          </Button>
          <Button
            shadow="default"
            size="fillWidth"
            variant="default"
            hover="default"
            rounded="circle"
            className="rounded-lg mx-auto text-center m-1"
          >
            Unassign Member
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AssignedUser;
