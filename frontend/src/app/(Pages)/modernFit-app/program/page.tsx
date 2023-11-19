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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-8 md:w-3/4 md:mx-auto">
        <div className="mt-3">
          <h2 className="text-3xl font-bold text-blue-200">dietary program</h2>
          <ProgramTable plan={dietPlan} />
        </div>
        <div className="my-4">
          <h2 className="text-3xl font-bold text-blue-200">physical program</h2>
          <ProgramTableWorkout plan={physicalPlan} />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default ProgramPage;
