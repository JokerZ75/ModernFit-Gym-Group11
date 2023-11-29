import React from "react";
import AssignedUser from "./components/assignedUser";
import UnassignedUser from "./components/unassignedUser";
import SearchBar from "./components/SearchBar";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import GoBackButton from "@/app/components/GoBackButton";

const myUsers: React.FC = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;

  const isTrainerOrNutritionist = await queryClient.fetchQuery({
    queryKey: ["isTrainerOrNutritionist"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return (data?.position === "Trainer" ||
        data?.position === "Nutritionist") as boolean;
    },
  });

  if (!isTrainerOrNutritionist) {
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

  type userType = {
    _id: string;
    Name: string;
    Email: string;
    Profile_picture: string;
    Height: number;
    Weight: number;
    Gym_Goals: string;
  };

  let profileImage = "https://placehold.co/300x300";
  let id = "12345";
  let firstName = "John";
  let lastName = "Smith";
  let height = "5'8";
  let weight = 165;
  let goals =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa magna, viverra sed venenatis vitae, blandit vel mi. Donec non.";
  if (goals.length > 30) {
    goals = goals.slice(0, 30);
    goals += "...";
  }

  const waitingUsers = await queryClient.fetchQuery({
    queryKey: ["waitingUsers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/program-request/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as userType[];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="text-blue-200 md:w-3/4 mx-auto my-4 px-4">
        <div className="font-bold text-2xl">my users</div>
        <div className="mx-auto mb-2">
          <SearchBar />
        </div>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-[400px] overflow-y-scroll">
          <AssignedUser
            User_id={id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            goals={goals}
            height={height}
            weight={weight}
          />
          <AssignedUser
            User_id={id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            goals={goals}
            height={height}
            weight={weight}
          />
          <AssignedUser
            User_id={id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            goals={goals}
            height={height}
            weight={weight}
          />
          <AssignedUser
            User_id={id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            goals={goals}
            height={height}
            weight={weight}
          />
          <AssignedUser
            User_id={id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            goals={goals}
            height={height}
            weight={weight}
          />
        </div>

        <div className="font-bold text-2xl">waiting users</div>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-[400px] overflow-y-scroll">
          {waitingUsers &&
            waitingUsers.map((user: userType) => {
              return (
                <UnassignedUser
                  key={user._id}
                  User_id={user._id}
                  firstName={user.Name}
                  lastName={user.Name}
                  profileImage={user.Profile_picture}
                  goals={user.Gym_Goals}
                  height={user.Height}
                  weight={user.Weight}
                />
              );
            })}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default myUsers;
