"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";

type props = {
  user: userType;
};

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const AssignedUser: React.FC<props> = ({ user }) => {
  const [goals, setGoals] = useState<string>(user.Gym_Goals);
  if (goals.length > 30) {
    setGoals((old) => old.slice(0, 30) + "...");
  }

  React.useEffect(() => {
    axios
      .get(`${user.Profile_picture}`)
      .then((res) => {})
      .catch((err) => {
        user.Profile_picture = "https://placehold.co/300x300";
      });
  }, []);

  const { getHeaders, api_url } = useAuthContext();

  const queryClient = useQueryClient();

  const { mutate: unassignUser } = useMutation({
    mutationKey: ["assignedUsers", user._id],
    mutationFn: async (user: userType) => {
      queryClient.cancelQueries({ queryKey: ["waitingUsers"] });
      queryClient.cancelQueries({ queryKey: ["assignedUsers"] });
      queryClient.cancelQueries({ queryKey: ["assignedUsersOptions"] });

      const previousAssignedUsers = queryClient.getQueryData(["assignedUsers"]);
      const previousWaitingUsers = queryClient.getQueryData(["waitingUsers"]);
      const previousAssignedUsersOptions = queryClient.getQueryData([
        "assignedUsersOptions",
      ]);

      const headers = await getHeaders();
      const { data } = await axios.post(
        `${api_url}/program-request/unassign/${user._id}`,
        {},
        {
          headers: headers,
        }
      );
      queryClient.setQueryData(["waitingUsers"], (old: userType[]) => {
        return [...old, user];
      });
      queryClient.setQueryData(["assignedUsers"], (old: userType[]) => {
        return old?.filter((user: userType) => user._id !== user._id);
      });
      queryClient.setQueryData(["assignedUsersOptions"], (old: string[]) => {
        return old?.filter((name: string) => name !== user.Name);
      });

      return {
        previousAssignedUsers,
        previousWaitingUsers,
        previousAssignedUsersOptions,
      };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(["waitingUsers"], context?.previousWaitingUsers);
      queryClient.setQueryData(
        ["assignedUsers"],
        context?.previousAssignedUsers
      );
      queryClient.setQueryData(
        ["assignedUsersOptions"],
        context?.previousAssignedUsersOptions
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["waitingUsers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assignedUsers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignedUsersOptions"],
      });
    },
  });

  return (
    <div className="max-w-sm w-full h-full mx-auto mb-3 bg-blue-100 rounded-xl p-3">
      <div className="flex">
        <img
          src={user.Profile_picture}
          alt="Profile Picture"
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <div className="mx-auto w-3/4 ml-5">
          <p className="text-white text-xl">{user.Name}</p>
          <p className="text-black text-lg">
            {user.Height} {user.Weight}lbs
          </p>
        </div>
      </div>
      <div className="mx-auto w-5/6">
        <div className="text-black">
          {user.Name}&#39;s gym goals are: {goals}
        </div>
        <div className="text-white font-bold underline hover:text-orange-100 transition-all duration-500">
          <Link href={`/modernFit-app/my-users/user-record/${user._id}`}>
            View Records
          </Link>
        </div>
        <div className="text-center">
          <Link href={`/modernFit-app/my-users/create-program/${user._id}`}>
            <Button
              shadow="default"
              size="fillWidth"
              variant="darkBlue"
              hover="default"
              className="rounded-lg mx-auto text-center m-1"
            >
              Create Program
            </Button>
          </Link>
          <Button
            shadow="default"
            size="fillWidth"
            variant="default"
            hover="default"
            rounded="circle"
            className="rounded-lg mx-auto text-center m-1"
            onClick={() => unassignUser(user)}
          >
            Unassign Member
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AssignedUser;
