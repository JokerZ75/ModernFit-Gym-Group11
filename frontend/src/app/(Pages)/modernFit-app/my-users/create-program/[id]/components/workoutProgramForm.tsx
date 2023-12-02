"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { Button } from "@/app/components/UI/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type workout_plan = {
  User_id: string;
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

const WorkoutoutProgramForm: React.FC<{
  id: string;
}> = ({ id }) => {
  const { getHeaders, api_url } = useAuthContext();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [selected, setSelected] = React.useState<number>(0);
  const queryclient = useQueryClient();

  const { mutate: sendWorkoutPlan } = useMutation({
    mutationKey: ["workoutPlan", id],
    mutationFn: async (workoutPlan: FieldValues) => {
      const headers = await getHeaders();
      const { data } = await toast.promise(
        axios.post(`${api_url}/workout-plan/send`, workoutPlan, {
          headers: headers,
        }),
        {
          pending: "Sending workout plan",
          success: "Workout plan sent",
          error: "Error sending workout plan",
        }
      );
      return data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["assignedUsers"],
      });
      queryclient.invalidateQueries({
        queryKey: ["waitingUsers"],
      });
      router.push("/modernFit-app/my-users");
    },
    onError: (err) => {},
  });

  const onSubmit = async (data: FieldValues) => {
    const workoutPlan: workout_plan = {
      User_id: id,
      Plan: {
        Monday: {
          WorkoutsList: data.mondayWorkout.split("\n"),
        },
        Tuesday: {
          WorkoutsList: data.tuesdayWorkout.split("\n"),
        },
        Wednesday: {
          WorkoutsList: data.wednesdayWorkout.split("\n"),
        },
        Thursday: {
          WorkoutsList: data.thursdayWorkout.split("\n"),
        },
        Friday: {
          WorkoutsList: data.fridayWorkout.split("\n"),
        },
      },
    };
    sendWorkoutPlan(workoutPlan);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  React.useEffect(() => {
    const divs = formRef.current?.querySelectorAll(".page-form__page");
    if (divs) {
      divs.forEach((div, index) => {
        if (index === selected) {
          div.classList.remove("page-form__unselected");
        } else {
          div.classList.add("page-form__unselected");
        }
      });
    }
  }, [selected]);

  return (
    <>
      <form
        className="page-form page-form-pages !h-[360px]"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        {daysOfWeek.map((day, index) => {
          if (index == 0) {
            return (
              <div className="page-form__page" key={index}>
                <h2 className="page-form__page__title">{day}</h2>
                <textarea
                  placeholder={`Write ${day}'s workouts here [Each workout on a new line]`}
                  className="page-form__page__input page-form-input h-64"
                  {...register(`${day.toLowerCase()}Workout`)}
                />
              </div>
            );
          }
          return (
            <>
              <div
                className="page-form__page page-form__unselected"
                key={index}
              >
                <h2 className="page-form__page__title">{day}</h2>
                <textarea
                  placeholder={`Write ${day}'s workouts here [Each workout on a new line]`}
                  className="page-form__page__input page-form-input h-64"
                  {...register(`${day.toLowerCase()}Workout`)}
                />
                {index === 4 && (
                  <div className="mx-auto w-full">
                    <Button
                      variant="darkBlue"
                      hover="hoverLightBlue"
                      size="default"
                      className="rounded-lg w-full  text-center mt-2"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </form>
      <div id="page-controls" className="flex">
        <Button
          variant="darkBlue"
          hover="hoverLightBlue"
          size="default"
          className="w-1/2 rounded-lg mx-auto text-center m-1"
          onClick={() => {
            setSelected(selected - 1);
          }}
          disabled={selected === 0}
        >
          Previous
        </Button>
        <Button
          variant="darkBlue"
          hover="hoverLightBlue"
          size="default"
          className="w-1/2 rounded-lg mx-auto text-center m-1"
          onClick={() => {
            setSelected(selected + 1);
          }}
          disabled={selected === 4}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default WorkoutoutProgramForm;
