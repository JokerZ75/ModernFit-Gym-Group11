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
  const id = params.id;
  console.log(id);

  await queryClient.prefetchQuery({
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
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["workoutType", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/typeofworkout/${params.id}`,
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
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["mealcatagories", params.id],
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
      <main className="px-8 py-5 md:w-3/4 mx-auto">
        <RecentWorkouts />
        <div className="mt-4"></div>
        <RecentNutritionalActivity />
      </main>
    </HydrationBoundary>
  );
};

export default ActivityDiary;
