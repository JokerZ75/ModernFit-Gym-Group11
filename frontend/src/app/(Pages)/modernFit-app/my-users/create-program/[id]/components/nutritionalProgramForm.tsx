"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type DietPlan = {
  User_id: string;
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

const NutritionalProgramForm: React.FC<{
  id: string;
}> = ({ id }) => {
  const { getHeaders, api_url } = useAuthContext();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const queryclient = useQueryClient();

  const { mutate: sendDietPlan } = useMutation({
    mutationKey: ["dietPlan", id],
    mutationFn: async (dietPlan: DietPlan) => {
      const headers = await getHeaders();
      const { data } = await toast.promise(
        axios.post(`${api_url}/diet-plan/send`, dietPlan, {
          headers: headers,
        }),
        {
          pending: "Sending Diet Plan...",
          success: "Diet Plan Sent!",
          error: "Error Sending Diet Plan",
        }
      );
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

  const [selected, setSelected] = React.useState<number>(0);

  const formRef = React.useRef<HTMLFormElement>(null);

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

  const OnSubmit = async (data: FieldValues) => {
    const dietPlan: DietPlan = {
      User_id: id,
      Plan: {
        Monday: {
          Breakfast: data.mondayBreakfast,
          Lunch: data.mondayLunch,
          Dinner: data.mondayDinner,
          Snack: data.mondaySnack,
        },
        Tuesday: {
          Breakfast: data.tuesdayBreakfast,
          Lunch: data.tuesdayLunch,
          Dinner: data.tuesdayDinner,
          Snack: data.tuesdaySnack,
        },
        Wednesday: {
          Breakfast: data.wednesdayBreakfast,
          Lunch: data.wednesdayLunch,
          Dinner: data.wednesdayDinner,
          Snack: data.wednesdaySnack,
        },
        Thursday: {
          Breakfast: data.thursdayBreakfast,
          Lunch: data.thursdayLunch,
          Dinner: data.thursdayDinner,
          Snack: data.thursdaySnack,
        },
        Friday: {
          Breakfast: data.fridayBreakfast,
          Lunch: data.fridayLunch,
          Dinner: data.fridayDinner,
          Snack: data.fridaySnack,
        },
      },
    };
    sendDietPlan(dietPlan);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <>
      <form
        className="page-form page-form-pages"
        ref={formRef}
        onSubmit={handleSubmit(OnSubmit)}
      >
        {daysOfWeek.map((day, index) => {
          if (index == 0) {
            return (
              <div className="page-form__page" key={index}>
                <h2 className="page-form__page__title">{day}</h2>
                <input
                  type="text"
                  placeholder="Breakfast"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Breakfast`)}
                />
                <input
                  type="text"
                  placeholder="Lunch"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Lunch`)}
                />
                <input
                  type="text"
                  placeholder="Dinner"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Dinner`)}
                />
                <input
                  type="text"
                  placeholder="Snack"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Snack`)}
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
                <input
                  type="text"
                  placeholder="Breakfast"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Breakfast`)}
                />
                <input
                  type="text"
                  placeholder="Lunch"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Lunch`)}
                />
                <input
                  type="text"
                  placeholder="Dinner"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Dinner`)}
                />
                <input
                  type="text"
                  placeholder="Snack"
                  className="page-form__page__input"
                  {...register(`${day.toLowerCase()}Snack`)}
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

export default NutritionalProgramForm;
