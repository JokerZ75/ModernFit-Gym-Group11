import React from "react";
import ProgramTable from "./components/programTable";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import ProgramTableWorkout from "./components/programTableWorkout";
import { Button } from "@/app/components/UI/Button";
import RequestProgramButton from "./components/RequestProgramButton";

type dietPlan = {
  User_id: string;
  Staff_id: string;
  Plan: {
    Monday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Tuesday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Wednesday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Thursday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Friday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
  };
  msg?: string;
};

type workout_plan = {
  User_id: string;
  Staff_id: string;
  Plan: {
    Monday: {
      WorkoutsList: string[];
    };
    Tuesday: {
      WorkoutsList: string[];
    };
    Wednesday: {
      WorkoutsList: string[];
    };
    Thursday: {
      WorkoutsList: string[];
    };
    Friday: {
      WorkoutsList: string[];
    };
  };
  msg?: string;
};

const ProgramPage: React.FC = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const dietPlan = await queryClient.fetchQuery({
    queryKey: ["dietPlan"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/diet-plan/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as dietPlan;
    },
  });

  const physicalPlan = await queryClient.fetchQuery({
    queryKey: ["physicalPlan"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/workout-plan/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as workout_plan;
    },
  });

  const requestedProgram = await queryClient.fetchQuery({
    queryKey: ["requestedProgram"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/program-request/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.msg == "No program request")
        return [{ Name: "No program request" }];
      return data;
    },
  });


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-8 md:w-3/4 md:mx-auto">
        <div className="mt-3">
          <h2 className="text-3xl font-bold text-blue-200">dietary program</h2>
          {dietPlan?.msg == "No diet plan" ? (
            <div className="flex mb-5">
              <p>
                You dont have a diet plan, request one from a trainer to get
                started
              </p>
            </div>
          ) : (
            <>
              <ProgramTable plan={dietPlan} />
            </>
          )}
        </div>
        <div className="my-4">
          <h2 className="text-3xl font-bold text-blue-200">physical program</h2>
          {physicalPlan?.msg == "No workout plan" ? (
            <div className="flex mb-5">
              <p>
                You dont have a workout plan, request one from a trainer to get
                started
              </p>
            </div>
          ) : (
            <>
              <ProgramTableWorkout plan={physicalPlan} />
            </>
          )}
        </div>
        <div className="flex mb-5">
          {requestedProgram[0]?.Name === "No program request" && (
            <RequestProgramButton />
          )}
          {requestedProgram[0]?.Name !== "No program request" && (
            <div>
              <p>
                You have requested a program, please wait for a trainer to
                respond.
              </p>
            </div>
          )}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default ProgramPage;
