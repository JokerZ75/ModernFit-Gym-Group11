import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";
import PostForm from "./components/post-form";
import GoBackButton from "./components/GoBackButton";

const NutritionPost: React.FC = async () => {
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
    queryKey: ["mealcatagory"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/mealcategory/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as {
        _id: string;
        Name: string;
      }[];
    },
  });

  // const isNutritionist = await queryClient.fetchQuery({
  //   queryKey: ["isNutritionist"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return (data?.position === "Nutritionist") as boolean;
  //   },
  // });

  // if (!isNutritionist) {
  //   return (
  //     <HydrationBoundary state={dehydrate(queryClient)}>
  //       <h1 className="text-red-500 text-3xl font-extrabold">
  //         You are not authorized to view this page
  //       </h1>
  //       <GoBackButton />
  //     </HydrationBoundary>
  //   );
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-4 py-8 md:w-3/4 mx-auto">
        <h1 className="text-blue-200 text-3xl font-extrabold">Create Post</h1>
        <PostForm />
      </main>
    </HydrationBoundary>
  );
};

export default NutritionPost;
