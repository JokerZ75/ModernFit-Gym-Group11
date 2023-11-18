import React from "react";
import MyClassesContainer from "./components/ClassesContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";

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

  const classes = await queryClient.fetchQuery({
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

  const classesAtGym = await queryClient.fetchQuery({
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
      if (data?.msg == "No classes") return [{ Name: "No classes found" }];
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-2 py-5 md:w-3/4 mx-auto">
        <div>
          <h2 className="text-blue-200 font-bold text-3xl">my classes</h2>
          <MyClassesContainer type="myClasses" classes={classes} />
        </div>
        <div>
          <h2 className="text-blue-200 font-bold text-3xl">upcoming classes</h2>
          <MyClassesContainer type="upcomingClasses" classes={classesAtGym} />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default Classes;
