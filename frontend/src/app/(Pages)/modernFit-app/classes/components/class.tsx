"use client";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
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
      )
      return data;
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
          <p>
            Duration: {passedClass.Duration} minutes.
          </p>
          {type == "myClasses" ? (
            <Button
              variant="default"
              shadow="default"
              rounded="square"
              className=" mx-auto rounded-2xl mt-2 py-2"
              hover="default"
              size="fillWidth"
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
