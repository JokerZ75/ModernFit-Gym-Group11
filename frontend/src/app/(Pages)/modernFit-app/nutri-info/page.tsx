import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { cookies } from "next/headers";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/app/components/UI/Button";
import { cn } from "@/app/utils/classMerge";
import { randomInt } from "crypto";

const Nutricategories: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
  const catagories = await queryClient.fetchQuery({
    queryKey: ["mealcategories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/mealcatagory/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as any[];
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

  const colours = [
    "bg-blue-400",
    "bg-green-400",
    "bg-red-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-blue-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex m-auto flex-col">
        <h1 className="m-auto text-4xl text-sky-300">Info categories</h1>
        <div className="flex w-full justify-center m-auto md:flex-row flex-wrap">
          {catagories.map((catagory) => {
            return (
              <Link
                href={`/modernFit-app/nutritrional-page/${catagory._id}`}
                key={catagory._id}
              >
                <p
                  className={`p-16 md:m-5 my-2 text-2xl text-center text-white opacity-80 rounded-3xl md:md:text-3xl min-w-[300px] ${
                    colours[randomInt(colours.length)]
                  }`}
                >
                  {catagory.Name}
                </p>
              </Link>
            );
          })}
        </div>

        {isNutritionist && (
          <Link href="/modernFit-app/nutri-info/create-nutritional-post">
            <Button
              variant="darkBlue"
              hover="hoverLightBlue"
              shadow="default"
              size="fillWidth"
              className="py-5 mt-3 mb-5 rounded-xl"
            >
              create post
            </Button>
          </Link>
        )}
      </main>
    </HydrationBoundary>
  );
};
export default Nutricategories;
