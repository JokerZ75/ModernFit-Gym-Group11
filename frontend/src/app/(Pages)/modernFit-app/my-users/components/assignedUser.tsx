import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

type props = {
  children?: React.ReactNode;
  User_id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  goals: string;
  height: string;
  weight: number;
};

const AssignedUser: React.FC<props> = async ({
  children,
  User_id,
  firstName,
  lastName,
  profileImage,
  goals,
  height,
  weight,
}) => {
  if (goals.length > 30) {
    goals = goals.slice(0, 30);
    goals += "...";
  }

  await axios
    .get(`${profileImage}`)
    .then((res) => {})
    .catch((err) => {
      profileImage = "https://placehold.co/300x300";
    });

  return (
    <div className="max-w-sm mx-auto mb-3 bg-blue-100 rounded-xl p-3">
      <div className="flex">
        <img
          src={profileImage}
          alt="Profile Picture"
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <div className="mx-auto w-3/4 ml-5">
          <p className="text-white text-xl">
            {firstName} {lastName}
          </p>
          <p className="text-black text-lg">
            {height} {weight}lbs
          </p>
        </div>
      </div>
      <div className="mx-auto w-5/6">
        <div className="text-black">
          {firstName}&#39;s gym goals are: {goals}
        </div>
        <div className="text-white font-bold underline hover:text-orange-100 transition-all duration-500">
          <Link href={`/modernFit-app/my-users/user-record/${User_id}`}>
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
