import React from "react";
import CardSection from "./components/CardSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getNotifications, Notifications } from "./components/Notifications";

const Dashboard: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
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
