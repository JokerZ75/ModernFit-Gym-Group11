import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";
import GoBackButton from "./components/GoBackButton";
import EditRemoveForm from "./components/editRemovePostForm";

type nutrional_post = {
    _id: string;
    Staff_id: string;
    Title: string;
    Catagory_id: string;
    Average_calories: number;
    Image: string;
    Content: string;
  };

const editRemovePost: React.FC<{ params: { id: string } }> = async ({
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
        `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        return data as nutrional_post;
      },
    });
 
  const isNutritionist = await queryClient.fetchQuery({
    queryKey: ["isNutritionist"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return (data?.position === "Nutritionist") as boolean;
    },
  });

  if (!isNutritionist) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="w-3/4 mx-auto text-center">
            <h1 className="text-red-500 text-3xl font-extrabold">
               You are not authorized to view this page
            </h1>
          <GoBackButton />
        </div>
      </HydrationBoundary>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-4 py-8 md:w-3/4 mx-auto">
        <h1 className="text-blue-200 text-3xl font-extrabold">Edit / Remove Post</h1>
          <EditRemoveForm
              id={params.id}
              title={posts.Title}
              catagory={posts.Catagory_id}
              image={posts.Image}
              description={posts.Content}
              calories={posts.Average_calories}
          />
      </main>
    </HydrationBoundary>
  );
};

export default editRemovePost;