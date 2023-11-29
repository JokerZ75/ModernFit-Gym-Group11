"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import UnassignedUser from "./unassignedUser";

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const UnassignedUsers: React.FC = () => {
  const { getHeaders, api_url } = useAuthContext();

  const { data: waitingUsers } = useQuery({
    queryKey: ["waitingUsers"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/program-request/`, {
        headers: headers,
      });
      if (data.length == 0) return null;
      return data as userType[];
    },
  });


  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-[400px] overflow-y-scroll">
      {waitingUsers !== null ? (
        waitingUsers?.map((user: userType) => {
          return <UnassignedUser key={user._id} user={user} />;
        })
      ) : (
        <div>There are no unassigned users</div>
      )}
    </div>
  );
};

export default UnassignedUsers;
