"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import User from "./User";

type userType = {
  _id?: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
  Position: string;
};

const UserContainer: React.FC<{ children?: React.ReactNode }> = ({}: {
  children?: React.ReactNode;
}) => {
  const { getHeaders, api_url } = useAuthContext();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/user/allUsers`, {
        headers: headers,
      });
      if (data?.msg == "No users found") return data;
      await Promise.all(
        data?.map((user: userType) => {
          const splitEmail = user.Email.split("@");
          user.Email = `${splitEmail[0].slice(
            0,
            splitEmail[0].length / 3
          )}*****@${splitEmail[1]}`;
        })
      );
      return data as userType[];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-x-6  max-h-[400px] overflow-y-scroll">
        {users?.map((user: userType) => {
          return <User key={user._id} User={user} />;
        })}
      </div>
    </>
  );
};

export default UserContainer;
