import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";
import CheckServerRedirect from "./components/CheckServerRedirect";

const Register: React.FC = async () => {
  const cookieStore = cookies();
  const userDetails = cookieStore.get("user-details")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/`
      );
      return data as any[];
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CheckServerRedirect cookie={userDetails} />
        <div className="px-5 py-5 md:w-2/3 mx-auto">
          <div className="text-blue-200 text-center font-bold text-4xl mb-2">
            <h1>register</h1>
          </div>
          <RegisterForm />
          <Link href="/login" className="flex">
            <Button
              type="button"
              shadow="default"
              size="default"
              variant="lightBlue"
              hover="hoverDarkBlue"
              rounded="circle"
              className="w-3/4 border mx-auto"
            >
              login
            </Button>
          </Link>
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Register;
