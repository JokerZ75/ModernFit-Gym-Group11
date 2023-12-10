import React from "react";
import SearchBar from "./components/searchBar";
import { Button } from "@/app/components/UI/Button";
import IssueContainer from "./components/issueContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import GoBackButton from "../../../components/GoBackButton";
import User from "./components/User";
import UserContainer from "./components/userContainer";
import DownTimeContainer from "./components/downTimeContainer";

type userType = {
  _id?: string;
  Name: string;
  Email: string;
  Profile_picture?: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
  Position: string;
};

const adminPanel: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const isAdmin = await queryClient.fetchQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return (data?.position === "Admin") as boolean;
    },
  });

  // Dummy data
  let issue = "Lorem ipsum dolor sit amet";
  let time = "10:30";
  let date = "03/12/21";
  let description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus";

  if (!isAdmin) {
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

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
      if (data?.msg == "No users found") return data;
      await Promise.all(
        data?.map((user: userType) => {
          const splitEmail = user.Email.split("@");
          user.Email = `${splitEmail[0].slice(
            0,
            splitEmail[0].length / 3
          )}*****@${splitEmail[1]}`;
        })
      );
      return data as userType[];
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/`
      );
      return data as any[];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="py-5 m-auto md:w-3/4">
        <div className="text-blue-200 mx-auto mt-4 mb-4 px-4">
          <div className="mx-auto mb-4  pb-4 bg-white border-solid border-2 in-development border-blue-200 rounded-xl">
            <h2 className="font-bold text-center text-lg mt-2 mb-2">
              System Flagged Issues
            </h2>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-[400px] overflow-y-scroll px-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (
                  <IssueContainer
                    key={i}
                    issue={issue}
                    time={time}
                    date={date}
                    description={description}
                  />
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <DownTimeContainer />
          </div>
          <div className="">
            <h2 className="w-5/6 mx-auto mt-4 mb-4 font-bold text-xl">users</h2>
            <div className="w-5/6 mx-auto mb-2">
              <SearchBar />
            </div>
            <UserContainer />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default adminPanel;
