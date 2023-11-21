//page
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { cookies } from "next/headers";
import axios from "axios";
import Link from "next/link";

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
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex m-auto flex-col">
        <h1 className="m-auto text-4xl text-sky-300">Info categories</h1>
        <div className="flex justify-center m-auto md:flex-row flex-wrap">
          {catagories.map((catagory) => {
            return (
              <Link href={`/modernFit-app/nutritrional-page/${catagory._id}`} key={catagory._id}>
                <p  className="p-16 m-10 text-2xl text-center text-cyan-50 bg-opacity-80 bg-blue-400 rounded-3xl md:md:text-3xl">
                  {catagory.Name}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </HydrationBoundary>
  );
};
export default Nutricategories;
