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

const ActivityDiary: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/workout/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["workoutType"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/typeofworkout/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["nutritionalActivity"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/meal/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["mealcatagories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/mealcatagory/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient) }>
      <main className="px-8 py-5">
        <RecentWorkouts />
        <div className="mt-4"></div>
        <RecentNutritionalActivity />
      </main>
    </HydrationBoundary>
  );
};

export default ActivityDiary;
