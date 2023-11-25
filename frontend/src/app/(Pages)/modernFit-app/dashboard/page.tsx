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
import RecentWorkouts from "./components/RecentWorkouts";
import LatestWorkout from "./components/LatestWorkout";
import UpcomingClasses from "./components/upcomingClasses";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Date: Date;
  Time: Date;
  Duration: number;
  Branch_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Dashboard: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  if (token != undefined && token != "") { // This is for testing as we login with the notification component rn so we dont have cookie yet.
    await queryClient.prefetchQuery({
      queryKey: ["notifications"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/user`,
          {
            headers: {
              Authorization: `Bearer ${cookieStore.get("_auth_token")?.value}`,
            },
          }
        );
        return data;
      },
    });

    await queryClient.fetchQuery({
      queryKey: ["workouts"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/workout/user`,
          {
            headers: {
              Authorization: `Bearer ${cookieStore.get("_auth_token")?.value}`,
            },
          }
        );
        return data;
      },
    });

    await queryClient.fetchQuery({
      queryKey: ["upcomingclasses"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/class/user`,
          {
            headers: {
              Authorization: `Bearer ${cookieStore.get("_auth_token")?.value}`,
            },
          }
        );
        if (data.length === 0) return data;
        if (data?.msg == "No classes") return data;
        else {
          return data
            ?.sort((a: classType, b: classType) => {
              return a.Date > b.Date ? 1 : -1;
            })
            ?.reverse()
            ?.splice(0, 3);
        }
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-2 md:grid md:grid-cols-2 md:gap-4 md:items-stretch h-screen md:mb-10">
        <CardSection heading="notifications" className="h-[300px] px-2">
          <Notifications />
        </CardSection>
        <CardSection heading="workouts in last 30 days">
          <RecentWorkouts />
        </CardSection>
        <CardSection heading="upcoming classes">
          <UpcomingClasses />
        </CardSection>
        <CardSection heading="latest workout">
          <LatestWorkout />
        </CardSection>
      </main>
    </HydrationBoundary>
  );
};

export default Dashboard;
