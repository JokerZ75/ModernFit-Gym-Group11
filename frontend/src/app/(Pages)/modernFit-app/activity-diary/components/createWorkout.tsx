"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import { Button } from "@/app/components/UI/Button";

const createMeal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { api_url, getHeaders } = useAuthContext();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const { data: workTypes } = useQuery({
    queryKey: ["workType"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/typeofworkout//`, {
        headers: headers,
      });
      return data as any[];
    },
  });

  return (
    <>
      <div className="px-5 py-5">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2 mr-2">
          <h1>add workout</h1>
        </div>
        <form
          className="modal-form text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <label htmlFor="workoutName">machine / name</label>
            <input
              type="text"
              placeholder="name (e.g. treadmill, pushups, etc.)"
              id="workoutName"
              {...register("workoutName", { required: true, minLength: 3 })}
            />
          </div>
          {errors.mealName && (
            <p className="form-error">meal name is required</p>
          )}
          <div>
            <label htmlFor="workType">type</label>
            <select id="workType" {...register("workType", { required: true })}>
              {workTypes?.map((type: any) => {
                return (
                  <option key={type._id} value={type._id}>
                    {type.Name}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.workType && (
            <p className="form-error">workout type is required</p>
          )}
          <div>
            <label htmlFor="duration">duration</label>
            <input
              type="number"
              placeholder="duration (in minutes)"
              id="duration"
              {...register("duration", {
                required: true,
                pattern: /^[0-9]+$/,
                min: 1,
              })}
            />
          </div>
          {errors.duration && (
            <p className="form-error">duration is required. (Atleast 1)</p>
          )}
          <div className="">
            <label htmlFor="caloriesBurned">calories burned</label>
            <input
              type="number"
              placeholder="calories burned"
              id="caloriesBurned"
              {...register("caloriesBurned", {
                required: true,
                pattern: /^[0-9]+$/,
                min: 1,
              })}
            />
          </div>
          {errors.caloriesBurned && (
            <p className="form-error">
              calories burned is required. (Atleast 1)
            </p>
          )}
          <Button
            variant="default"
            shadow="default"
            rounded="circle"
            className="mx-auto  mt-4 mb-2 w-3/4 border "
            hover="default"
            size="default"
            type="submit"
          >
            submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default createMeal;
