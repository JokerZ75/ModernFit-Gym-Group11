import React from "react";
import CardSection from "./components/CardSection";
import axios from "axios";
import { Notifications } from "./components/Notifications";
import { cookies } from "next/headers";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const Dashboard: React.FC = async () => {
  const cookieStore = cookies();
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 1000 * 60,
      }
    }
  });

  await  queryClient.prefetchQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/`,
        {
          headers: {
            Authorization: `Bearer ${cookieStore.get("_auth_token")?.value}`,
          },
        }
      );
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-2">
        <CardSection heading="notifications">
          <Notifications />
        </CardSection>
        <CardSection heading="workouts in last 30 days">
          <p>Notifications</p>
        </CardSection>
        <CardSection heading="upcoming classes">
          <p>Notifications</p>
        </CardSection>
        <CardSection heading="latest workout">
          <p>Notifications</p>
        </CardSection>
      </main>
    </HydrationBoundary>
  );
};

export default Dashboard;
