import React from "react";
import { cookies } from "next/headers";
import axios from "axios";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import GoBackButton from "@/app/components/GoBackButton";
import FormWrapper from "./components/formWrapper";
import NutritionalProgramForm from "./components/nutritionalProgramForm";

const createProgram: React.FC<{
  params: {
    id: string;
  };
}> = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const isTrainer = await queryClient.fetchQuery({
    queryKey: ["isTrainer"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return (data?.position === "Trainer") as boolean;
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

  if (!isTrainer && !isNutritionist) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="text-center">
          <h1 className="text-2xl font-bold mt-4 mb-4">
            You are not authorized to view this page
          </h1>
          <GoBackButton />
        </main>
      </HydrationBoundary>
    );
  }

  const user = await queryClient.fetchQuery({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  if (isTrainer) {
    // Make phyical program here
    return (
      <FormWrapper
        params={{
          user: user.Name,
        }}
      >
        <div></div>
      </FormWrapper>
    );
  }

  if (isNutritionist) {
    // Make nutritional program here
    // const hasProgramWithNoRequest = await queryClient.fetchQuery({
    //   queryKey: ["hasProgramWithNoRequest", params.id],
    //   queryFn: async () => {
    //     const { data } = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}/program-request/${params.id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     return data;
    //   },
    // });


    return (
      <FormWrapper
        params={{
          user: user.Name,
        }}
      >
        <NutritionalProgramForm id={params.id} />
      </FormWrapper>
    );
  }
};

export default createProgram;
