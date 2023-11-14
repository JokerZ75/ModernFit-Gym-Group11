import React from "react";
import RecentWorkouts from "./components/RecentWorkouts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";

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
      )
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <RecentWorkouts />
        <div>
          <h2>recent nutritional activity</h2>
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default ActivityDiary;
