import React from "react";
import InformationContainer from "./components/informationContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";

type mealCatagory = {
  Name: string;
  Avg_calories: number;
  Description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type nutrional_post = {
  Staff_id: string;
  Title: string;
  Catagory_id: string;
  Average_calories: number;
  Image: string;
  Content: string;
};

const nutritionInfo: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const posts = await queryClient.fetchQuery({
    queryKey: ["nutritional_post", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as nutrional_post[];
    },
  });

  const catagory = await queryClient.fetchQuery({
    queryKey: ["mealcategories", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/mealcatagory/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as mealCatagory;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="md:w-3/4 mx-auto px-4">
        <div className=" font-bold text-blue-200 text-2xl md:text-4xl mt-4">
          <h2>{catagory.Name}</h2>
        </div>
        <br></br>
        <div className="mx-auto text-md md:text-lg">
          {catagory.Description}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-6">
          {posts?.map((post) => {
            return (
              <InformationContainer
                name={post.Title}
                image={post.Image}
                description={post.Content}
                author={post.Staff_id}
                calories={post.Average_calories}
              />
            );
          })}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default nutritionInfo;
