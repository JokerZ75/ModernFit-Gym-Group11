import React from "react";
import InformationContainer from "./components/informationContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {cookies} from "next/headers";
import axios from "axios";


const nutritionInfo: React.FC = async () => {

  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      }
    }
  });

  const posts = await queryClient.fetchQuery(
    {
      queryKey: ["accountDetails"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data as any[];
      },
    },
  );

  let foodType = "Meat";
  let foodTypeDescription = "Meat is important due to its rich nutrient content, providing essential proteins, vitamins and minerals crucial for overall health. Its cultural significance and versatility in cooking make it a valued part of global cuisine, while its economic impact sustains livelihoods in the meat industry."
  let name = "Lorem ipsum";
  let image = "https://placehold.co/300x150";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultrices libero lobortis finibus. Praesent nibh justo, congue nec elementum lobortis, suscipit nec lacus. Fusce venenatis quam lectus, a sagittis sapien tincidunt sit amet. Aliquam erat volutpat. Fusce varius odio efficitur, auctor nisl sed, consectetur erat. Nulla et auctor";
  let author = "John Smith";
  let calories = 1300;

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="">
          <div className="text-center font-bold text-2xl"><h1>Nutritional Information</h1></div>
          <div className="text-center font-bold text-xl"><h2>{foodType}</h2></div><br></br>
          <div className="text-center w-3/4 mx-auto text-sm">{foodTypeDescription}</div>
        </div>


        <InformationContainer
          name={name}
          image={image}
          description={description}
          author={author}
          calories={calories}
        />
      </HydrationBoundary>
    </>
  );
};


export default nutritionInfo;
