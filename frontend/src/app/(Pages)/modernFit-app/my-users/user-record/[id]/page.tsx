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
      return data;
    },
  });

  const workoutTypes = await queryClient.fetchQuery({
    queryKey: ["workoutTypes"],
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
      return data;
    },
  });

  const mealCatagories = await queryClient.fetchQuery({
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-8 py-5 md:w-3/4 mx-auto">
        <RecentWorkouts data={workouts} workoutTypes={workoutTypes} />
        <div className="mt-4"></div>
        <RecentNutritionalActivity
          meals={meals}
          mealCatagories={mealCatagories}
        />
      </main>
    </HydrationBoundary>
  );
};

export default ActivityDiary;
