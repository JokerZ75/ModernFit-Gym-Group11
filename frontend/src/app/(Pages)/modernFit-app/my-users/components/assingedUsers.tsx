"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import AssignedUser from "./assignedUser";

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const AssignedUsers: React.FC = () => {
  const { getHeaders, api_url } = useAuthContext();

  const { data: assignedUsers } = useQuery({
    queryKey: ["assignedUsers"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/staff/assigned/`, {
        headers: headers,
      });
      if (data.length == 0) return null;
      return data;
    },
  });


  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-[400px] overflow-y-scroll">
      {assignedUsers !== null ? (
        assignedUsers.map((user: userType) => {
          return <AssignedUser key={user._id} user={user} />;
        })
      ) : (
        <div>There are no assigned users</div>
      )}
    </div>
  );
};

export default AssignedUsers;
