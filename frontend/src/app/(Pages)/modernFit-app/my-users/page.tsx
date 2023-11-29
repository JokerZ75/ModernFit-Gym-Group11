import React from "react";
import SearchBar from "./components/SearchBar";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import GoBackButton from "@/app/components/GoBackButton";
import AssignedUsers from "./components/assingedUsers";
import UnassignedUsers from "./components/unassignedUsers";

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const myUsers: React.FC = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;

  const isTrainerOrNutritionist = await queryClient.fetchQuery({
    queryKey: ["isTrainerOrNutritionist"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return (data?.position === "Trainer" ||
        data?.position === "Nutritionist") as boolean;
    },
  });

  if (!isTrainerOrNutritionist) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="text-center">
          <h1 className="text-2xl font-bold mt-4 mb-4">
            You are not authorized to view this page
          </h1>
          <GoBackButton />
        </main>
      </HydrationBoundary>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["waitingUsers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/program-request/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as userType[];
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["assignedUsers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/staff/assigned/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.length === 0) return null;
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="text-blue-200 md:w-3/4 mx-auto my-4 px-4">
        <div className="font-bold text-2xl">my users</div>
        <div className="mx-auto mb-2">
          <SearchBar />
        </div>
        <AssignedUsers />
        <div className="font-bold text-2xl">waiting users</div>
        <UnassignedUsers />
      </main>
    </HydrationBoundary>
  );
};

export default myUsers;
