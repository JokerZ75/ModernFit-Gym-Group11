"use client";
import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/app/components/UI/Button";

const RecentWorkouts: React.FC = () => {
  const { api_url,getHeaders } = useAuthContext();
  const { data } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/workout/user`, {
        headers: headers,
      });
      return data as any[];
    },
  });

  return (
    <>
      <p className="text-center font-bold text-4xl md:text-6xl">{data?.length}</p>
      <Link href="/modernFit-app/activity-diary" className="flex mt-2">
        <Button variant="default" shadow="default" rounded="circle" className="w-[75%] mx-auto">go to diary</Button>
        </Link>
    </>
  );
};

export default RecentWorkouts;
