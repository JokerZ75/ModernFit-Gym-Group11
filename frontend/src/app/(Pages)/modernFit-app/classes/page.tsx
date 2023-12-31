import React from "react";
import MyClassesContainer from "./components/ClassesContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useMutationState,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import Modal from "@/app/components/Modal";
import CreateClass from "./components/CreateClass";
import CreateClassButton from "./components/CreateClassButton";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Type: "ongoing" | "cancelled";
  Date: Date;
  Duration: number;
  Branch_id: string;
};

const Classes: React.FC = async () => {
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
    queryKey: ["upcomingclasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/class/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.msg == "No classes") data;
      data
        ?.sort((a: classType, b: classType) => {
          const aDate = new Date(a.Date);
          const bDate = new Date(b.Date);
          return aDate.getTime() - bDate.getTime();
        })
        .reverse();

      data?.sort((a: classType, b: classType) => {
        if (a.Type === "cancelled") return 1;
        if (b.Type === "cancelled") return -1;
        return 0;
      });

      return data as classType[];
    },
  });

  const isTrainer = await queryClient.fetchQuery({
    queryKey: ["isTrainer"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${cookieStore.get("_auth_token")?.value}`,
          },
        }
      );
      if (data?.position == "Trainer") {
        return true;
      }
      return false;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["classesAtGym"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/class/branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.length === 0) {
        return data;
      }
      if (data?.msg == "No classes") return data;
      data
        ?.sort((a: classType, b: classType) => {
          const aDate = new Date(a.Date);
          const bDate = new Date(b.Date);
          return aDate.getTime() - bDate.getTime();
        })
        .reverse();
      return data as classType[];
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as any[];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-2 py-5 md:w-3/4 mx-auto">
        <div>
          <h2 className="text-blue-200 font-bold text-3xl">my classes</h2>
          <MyClassesContainer type="myClasses" />
        </div>
        <div className="mt-4">
          <h2 className="text-blue-200 font-bold text-3xl">upcoming classes</h2>
          <MyClassesContainer type="upcomingClasses" />
        </div>
        {isTrainer ? <CreateClassButton /> : null}
      </main>
    </HydrationBoundary>
  );
};

export default Classes;
