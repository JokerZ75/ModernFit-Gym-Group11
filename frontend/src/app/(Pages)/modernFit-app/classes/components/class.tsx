"use client";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { formatDayMonth, formatHourMinute } from "@/app/utils/dateFormat";
import { Button } from "@/app/components/UI/Button";
type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Date: Date;
  Type: "ongoing" | "cancelled";
  Duration: number;
  Branch_id: string;
  msg?: string;
};

interface ClassProps {
  passedClass: classType;
  type: "myClasses" | "upcomingClasses";
}

const Class: React.FC<ClassProps> = ({ passedClass, type }) => {
  const { api_url, getHeaders } = useAuthContext();
  const { data: ownerInfo } = useQuery({
    queryKey: ["ownerInfo", passedClass.Owner_id],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(
        `${api_url}/user/${passedClass.Owner_id}`,
        {
          headers: headers,
        }
      );
      return data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: markInterest } = useMutation({
    mutationKey: ["markInterest"],
    mutationFn: async (newClass: classType) => {
      await queryClient.cancelQueries({ queryKey: ["upcomingclasses"] });
      await queryClient.cancelQueries({ queryKey: ["classesAtGym"] });

      const previousClasses = await queryClient.getQueryData([
        "upcomingclasses",
      ]);
      const previousGymClasses = await queryClient.getQueryData([
        "classesAtGym",
      ]);

      const headers = await getHeaders();
      const { data } = await axios.post(
        `${api_url}/class/mark-interest/${passedClass._id}`,
        {},
        {
          headers: headers,
        }
      );

      await queryClient.setQueryData(
        ["upcomingclasses"],
        (old: classType[]) => [...old, newClass]
      );
      await queryClient.setQueryData(["classesAtGym"], (old: classType[]) => {
        const newClassesAtGym = old.filter(
          (classItem) => classItem._id !== passedClass._id
        );
        return newClassesAtGym;
      });

      return { previousClasses, previousGymClasses };
    },
    onError: (err, newClass, context: any) => {
      queryClient.setQueryData(["upcomingclasses"], context.previousClasses);
      queryClient.setQueryData(["classesAtGym"], context.previousGymClasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["upcomingclasses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["classesAtGym"],
      });
    },
  });

  const { mutate: removeInterest } = useMutation({
    mutationKey: ["removeInterest"],
    mutationFn: async (newClass: classType) => {
      await queryClient.cancelQueries({ queryKey: ["classesAtGym"] });
      await queryClient.cancelQueries({ queryKey: ["upcomingclasses"] });

      const previousClasses = await queryClient.getQueryData(["classesAtGym"]);
      const previousUpcomingClasses = await queryClient.getQueryData([
        "upcomingclasses",
      ]);

      const headers = await getHeaders();
      const { data } = await axios.post(
        `${api_url}/class/mark-uninterest/${passedClass._id}`,
        {},
        {
          headers: headers,
        }
      );

      // @ts-expect-error
      if (previousClasses?.msg == "No classes") {
        await queryClient.setQueryData(["classesAtGym"], (old: classType[]) => [
          newClass,
        ]);
      } else {
        await queryClient.setQueryData(["classesAtGym"], (old: classType[]) => [
          ...old,
          newClass,
        ]);
      }
      // @ts-expect-error
      if (previousUpcomingClasses?.msg == "No classes") {
        await queryClient.setQueryData(
          ["upcomingclasses"],
          (old: classType[]) => [newClass]
        );
      } else {
        await queryClient.setQueryData(
          ["upcomingclasses"],
          (old: classType[]) => {
            const newUpcomingClasses = old.filter(
              (classItem) => classItem._id !== passedClass._id
            );
            return newUpcomingClasses;
          }
        );
      }

      return { previousClasses, previousUpcomingClasses };
    },
    onError: (err, newClass, context: any) => {
      console.log(err);
      queryClient.setQueryData(["classesAtGym"], context.previousClasses);
      queryClient.setQueryData(
        ["upcomingclasses"],
        context.previousUpcomingClasses
      );
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["classesAtGym"],
      });
      queryClient.invalidateQueries({
        queryKey: ["upcomingclasses"],
      });
    },
  });

  if (passedClass.Type == "cancelled") {
    return (
      <div className="bg-orange-200 bg-opacity-60 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-xl whitespace-nowrap">
            {passedClass.Name} (Cancelled)
          </h3>
          <p className="text-white">with {ownerInfo?.Name}</p>
        </div>
        <div>
          <p>
            your gym class of {passedClass.Name} for{" "}
            {formatDayMonth(passedClass.Date)} at{" "}
            {formatHourMinute(passedClass.Date)} was cancelled
          </p>
        </div>
      </div>
    );
  }

  if (passedClass.Type == "ongoing") {
    return (
      <div className="bg-blue-200 bg-opacity-50 rounded-xl p-3 pb-2 flex flex-col justify-between">
        <div className="flex">
          <h3 className="text-white font-bold text-xl mr-3 ">
            {passedClass.Name}
          </h3>
          <p className="ml-auto text-white">with {ownerInfo?.Name}</p>
        </div>
        <div>
          <p>
            {passedClass.Name} class at {formatDayMonth(passedClass.Date)} at{" "}
            {formatHourMinute(passedClass.Date)}.
          </p>
          <p>Duration: {passedClass.Duration} minutes.</p>
          {type == "myClasses" ? (
            <Button
              variant="default"
              shadow="default"
              rounded="square"
              className=" mx-auto rounded-2xl mt-2 py-2"
              hover="default"
              size="fillWidth"
              onClick={() => removeInterest(passedClass)}
            >
              Remove Interest
            </Button>
          ) : (
            <Button
              variant="darkBlue"
              shadow="default"
              rounded="square"
              className=" mx-auto rounded-2xl mt-2 py-2"
              hover="hoverLightBlue"
              size="fillWidth"
              onClick={() => markInterest(passedClass)}
            >
              Mark Interest
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <></>;
};

export default Class;
