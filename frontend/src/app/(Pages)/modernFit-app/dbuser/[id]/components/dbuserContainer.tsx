"use client";
import React from "react";
import dbuser from "./dbuser";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Type: "ongoing" | "cancelled";
  Date: Date;
  Duration: number;
  Branch_id: string;
  msg?: string;
};

const MyClassesContainer: React.FC<{
  type: "myClasses" | "upcomingClasses";
}> = ({ type }) => {
  const { getHeaders, api_url } = useAuthContext();

  const { data: classes } = useQuery({
    queryKey: ["upcomingclasses"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/class/user`, {
        headers: headers,
      });
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

  const { data: classesAtGym } = useQuery({
    queryKey: ["classesAtGym"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/class/branch`, {
        headers: headers,
      });
      return data as classType[];
    },
  });

  if (type === "upcomingClasses") {
    return (
      <div className="flex flex-col gap-3 mt-5 h-[350px] md:h-[450px] overflow-y-scroll">
       
          <p className="text-blue-200">
            There are no upcoming classes at your gym.
          </p>
      
          
      </div>
    );
  }

  if (type === "myClasses") {
    return (
      <div className="flex flex-col gap-3 mt-5 h-[350px] md:h-[450px] overflow-y-scroll">
       
       
        
          
      </div>
    );
  }
};

export default MyClassesContainer;
