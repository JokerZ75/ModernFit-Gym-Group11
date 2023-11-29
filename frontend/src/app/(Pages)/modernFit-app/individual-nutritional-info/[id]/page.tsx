import React from "react";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import IndividualInformation from "./components/individualInformation";
// test id = 65662f52d982bc0b88cc75f1

type nutrional_post = {
  _id: string;
  Staff_id: string;
  Title: string;
  Catagory_id: string;
  Average_calories: number;
  Image: string;
  Content: string;
};



const individualNutritionInfo: React.FC<{ params: { id: string } }> = async ({
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

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="md:w-3/4 mx-auto p-4">

              <IndividualInformation 
              title={posts.Title}
              catagory={posts.Catagory_id}
              image={posts.Image}
              description={posts.Content}
              author={posts.Staff_id}
              calories={posts.Average_calories}
            />
            
        </main>
      </HydrationBoundary>
    );
  };
  
  export default individualNutritionInfo;