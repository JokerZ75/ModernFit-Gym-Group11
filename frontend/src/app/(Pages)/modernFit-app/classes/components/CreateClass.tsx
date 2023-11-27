"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import AutoComplete from "@/app/components/UI/AutoComplete";
import { Button } from "@/app/components/UI/Button";
import { toast } from "react-toastify";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Date: Date;
  Type: "ongoing" | "cancelled";
  Duration: number;
  Branch_id?: string;
  msg?: string;
};

const CreateClass: React.FC<{
  children?: React.ReactNode;
  setModalOpen: React.Dispatch<boolean>;
}> = ({ children, setModalOpen }) => {
  const { getHeaders } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (newClass: classType) => {
      const Headers = await getHeaders();
      await queryClient.cancelQueries({ queryKey: ["upcomingclasses"] });

      const previousClasses = await queryClient.getQueryData([
        "upcomingclasses",
      ]);
      const { data: res } = await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/class/add`, newClass, {
          headers: Headers,
        }),
        {
          pending: "Adding Class...",
          success: "Class added!",
          error: "Failed to add Class. Please try again.",
        }
      );

      if (
        // @ts-expect-error
        previousClasses?.msg == "No classes" ||
        previousClasses === undefined
      ) {
        await queryClient.setQueryData(
          ["upcomingclasses"],
          (old: classType[]) => [newClass]
        );
      } else {
        await queryClient.setQueryData(
          ["upcomingclasses"],
          (old: classType[]) => [...old, newClass]
        );
      }

      return { previousClasses };
    },
    onSuccess: (data) => {
      setModalOpen(false);
    },
    onError: (err, newClass, context: any) => {
      queryClient.setQueryData(["upcomingclasses"], context.previousClasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["upcomingclasses"],
      });
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: headers,
        }
      );
      return data as any;
    },
  });

  const onSubmit = (data: FieldValues) => {
    const timeSplit = data.Time.split(":");
    const date = new Date(data.Date);
    date.setHours(parseInt(timeSplit[0]));
    date.setMinutes(parseInt(timeSplit[1]));
    console.log(userData);
    const requestData: classType = {
      Owner_id: userData ? userData.id : "",
      Name: data.Name,
      Date: date,
      Duration: data.Duration,
      Type: "ongoing",
    };
    mutate(requestData);
  };

  return (
    <>
      <div className="px-5 py-5">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2 mr-2">
          <h1>create class</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-form text-center"
        >
          <div>
            <label htmlFor="Name">name</label>
            <input
              type="text"
              {...register("Name", {
                required: true,
                maxLength: 12,
                minLength: 3,
              })}
              placeholder="name"
            />
          </div>
          {errors.Name && (
            <p className="form-error">
              This field is required, should be between 3-12 characters
            </p>
          )}
          <div>
            <label htmlFor="date">date</label>
            <input
              type="date"
              {...register("Date", {
                required: true,
                validate: (value) => {
                  const date = new Date(value);
                  const time = getValues("Time");
                  if (time) {
                    const timeSplit = time.split(":");
                    date.setHours(parseInt(timeSplit[0]));
                    date.setMinutes(parseInt(timeSplit[1]));
                    const today = new Date();
                    if (date <= today) {
                      return false;
                    }
                    return true;
                  }
                  setError("Date", {
                    type: "manual",
                    message: "Time is required",
                  });
                  return false;
                },
              })}
              placeholder="date"
            />
          </div>
          {errors.Date && (
            <p className="form-error">
              This field is required and should, and should be todays date or
              later. Time is also required with the date
            </p>
          )}
          <div>
            <label htmlFor="time">time</label>
            <input
              type="time"
              {...register("Time", { required: true })}
              placeholder="time"
            />
          </div>
          <div>
            <label htmlFor="duration">duration</label>
            <input
              type="number"
              {...register("Duration", {
                required: true,
                min: 1,
                pattern: /^[0-9]*$/,
              })}
              placeholder="duration (in minutes)"
            />
          </div>
          {errors.Time && <p className="form-error">This field is required</p>}
          <Button
            type="submit"
            shadow="default"
            size="default"
            variant="default"
            hover="default"
            rounded="circle"
            className="w-3/4 mt-4 border mx-auto"
          >
            Create Class
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateClass;
