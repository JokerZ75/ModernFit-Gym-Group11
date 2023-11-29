"use client";

import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
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

const UnassignedUser: React.FC<props> = ({ user }) => {
  const [goals, setGoals] = React.useState<string>(user.Gym_Goals);
  if (goals.length > 30) {
    setGoals((old) => old.slice(0, 30) + "...");
  }

  const { getHeaders, api_url } = useAuthContext();

  const queryClient = useQueryClient();

  const { mutate: assignUser } = useMutation({
    mutationKey: ["assignedUsers", user._id],
    mutationFn: async (user: userType) => {
      queryClient.cancelQueries({ queryKey: ["waitingUsers"] });
      queryClient.cancelQueries({ queryKey: ["assignedUsers"] });

      const previousWaitingUsers = queryClient.getQueryData(["waitingUsers"]);
      const previousAssignedUsers = queryClient.getQueryData(["assignedUsers"]);

      const headers = await getHeaders();
      const { data } = await axios.post(
        `${api_url}/program-request/assign/${user._id}`,
        {},
        {
          headers: headers,
        }
      );
      queryClient.setQueryData(["assignedUsers"], (old: userType[]) => {
        return [...old, data];
      });
      queryClient.setQueryData(["waitingUsers"], (old: userType[]) => {
        return old?.filter((user: userType) => user._id !== user._id);
      });

      return { previousWaitingUsers, previousAssignedUsers };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(["waitingUsers"], context?.previousWaitingUsers);
      queryClient.setQueryData(
        ["assignedUsers"],
        context?.previousAssignedUsers
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["waitingUsers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assignedUsers"],
      });
    },
  });

  React.useEffect(() => {
    axios
      .get(`${user.Profile_picture}`)
      .then((res) => {})
      .catch((err) => {
        user.Profile_picture = "https://placehold.co/300x300";
      });
  }, []);

  return (
    <div className="max-w-sm w-full mx-auto mb-3 bg-blue-100 p-3 rounded-xl">
      <div className="flex">
        <img
          src={`${user.Profile_picture}`}
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
          <Button
            shadow="default"
            size="fillWidth"
            variant="darkBlue"
            hover="default"
            className="rounded-lg mx-auto text-center m-1"
            onClick={() => assignUser(user)}
          >
            Assign Self
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UnassignedUser;
