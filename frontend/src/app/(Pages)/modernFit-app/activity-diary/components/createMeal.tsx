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

  const { data: mealCatagories } = useQuery({
    queryKey: ["mealCatagories"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/mealcatagory/`, {
        headers: headers,
      });
      return data as any[];
    },
  });

  return (
    <>
      <div className="px-5 py-5">
        <div className="text-blue-200 text-center font-bold text-4xl mb-2">
          <h1>add meal</h1>
        </div>
        <form
          className="modal-form text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <label htmlFor="mealName">meal name</label>
            <input
              type="text"
              placeholder="meal name"
              id="mealName"
              {...register("mealName", { required: true, minLength: 3 })}
            />
          </div>
          {errors.mealName && (
            <p className="form-error">meal name is required</p>
          )}
          <div>
            <label htmlFor="mealCatagory">meal catagory</label>
            <select
              id="mealCatagory"
              {...register("mealCatagory", { required: true })}
            >
              {mealCatagories?.map((catagory: any) => {
                return (
                  <option key={catagory._id} value={catagory._id}>
                    {catagory.Name}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.mealCatagory && (
            <p className="form-error">meal catagory is required</p>
          )}
          <div className="">
            <label htmlFor="mealPortion">meal portion</label>
            <input
              type="number"
              placeholder="meal portion (g)"
              id="mealPortion"
              {...register("mealPortion", { required: true, pattern: /^[0-9]*$/, min: 1 })}
            />
          </div>
          {errors.mealPortion && (
            <p className="form-error">meal portion is required and must be a number. (Atleast 1)</p>
          )}
          <div className="">
            <label htmlFor="mealCalories">meal calories</label>
            <input
              type="number"
              placeholder="meal calories (kcal) (optional)"
              id="mealCalories"
              {...register("mealCalories", {
                required: false,
                pattern: /^[0-9]*$/,
                min: 1,
              })}
            />
          </div>
          {errors.mealCalories && (
            <p className="form-error">meal calories must be a number. (Atleast 1)</p>
          )}
          <Button
            variant="default"
            size="default"
            rounded="circle"
            type="submit"
            className=" mt-4 mb-2 w-3/4 border mx-auto"
          >
            submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default createMeal;
