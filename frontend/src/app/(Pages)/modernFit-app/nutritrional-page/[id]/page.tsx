import React from "react";
import InformationContainer from "./components/post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import PostContainer from "./components/postContainer";
import GoBackButton from "./components/GoBackButton";

type mealCatagory = {
  Name: string;
  Avg_calories: number;
  Description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type nutrional_post = {
  _id: string;
  Staff_id: string;
  Title: string;
  Catagory_id: string;
  Average_calories: number;
  Image: string;
  Content: string;
  author: string;
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

  await queryClient.prefetchQuery({
    queryKey: ["posts", params.id],
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
        <div>
          <div className="mt-4 flex flex-col md:flex-row">
            <GoBackButton />
          </div>
          <div className=" font-bold text-blue-200 text-2xl md:text-4xl ">
            <h2>{catagory.Name}</h2>
          </div>
          <br></br>
          <div className="mx-auto text-md md:text-lg">
            {catagory.Description}
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6">
          <PostContainer catagoryID={params.id} />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default nutritionInfo;
