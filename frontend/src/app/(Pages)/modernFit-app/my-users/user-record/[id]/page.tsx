import React from "react";
import RecentWorkouts from "./components/RecentWorkouts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import RecentNutritionalActivity from "./components/RecentNutritionalActivity";
import GoBackButton from "@/app/components/GoBackButton";

const ActivityDiary: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

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

  const workouts = await queryClient.fetchQuery({
    queryKey: ["workouts", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/workout/${params.id}`,
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

  const meals = await queryClient.fetchQuery({
    queryKey: ["nutritionalActivity", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/meal/${params.id}`,
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

  const user = await queryClient.fetchQuery({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`,
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
      <main className="px-8 py-5 md:w-3/4 mx-auto">
        <div className="flex gap-5">
          <GoBackButton />
          <div className="text-2xl font-bold mt-4 mb-4">
            {user?.Name}'s Activity Diary
          </div>
        </div>
        <RecentWorkouts workouts={workouts} />
        <div className="mt-4"></div>
        <RecentNutritionalActivity meals={meals} />
      </main>
    </HydrationBoundary>
  );
};

export default ActivityDiary;
