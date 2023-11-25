"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import AutoComplete from "@/app/components/UI/AutoComplete";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const { data: gymLocations } = useQuery({
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
      <form
        id="register-form"
        className="text-center modal-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name">name</label>
          <input
            className="inputField"
            type="text"
            placeholder="name"
            id="name"
            {...register("name", { minLength: 3, required: true })}
          />
        </div>
        {errors.name && (
          <p className="form-error">name must be at least 3 characters</p>
        )}
        <div>
          <label htmlFor="email">email</label>
          <input
            className="inputField"
            type="text"
            placeholder="example@example.com"
            id="email"
            {...register("email", {
              validate: (value) => {
                if (value.includes("@") && value.includes(".")) {
                  return true;
                } else {
                  return false;
                }
              },
              required: true,
            })}
          />
        </div>
        {errors.email && (
          <p className="form-error">please enter a valid email</p>
        )}
        <div>
          <label htmlFor="gymLocation">gym location</label>
            {gymLocations && (
              <AutoComplete
                className=""
                id="gymLocation"
                register={...register("gymLocation", { required: true }) as any}
                options={gymLocations?.map(
                  (location) => `${location.Name}-(${location.Address})`
                )}
              />
            )}
        </div>
        {errors.gymLocation && (
          <p className="form-error">please enter a gym location</p>
        )}
        <div>
          <label htmlFor="mobileNumber">mobile number</label>
          <input
            className="inputField"
            type="tel"
            placeholder="07975777666"
            id="mobileNumber"
            {...register("mobileNumber", {
              required: true,
              minLength: 11,
              maxLength: 11,
              pattern: /[0-9]/g,
              validate: (value) => {
                if (value.startsWith("0")) {
                  return true;
                } else {
                  return false;
                }
              },
            })}
          />
        </div>
        {errors.mobileNumber && (
          <p className="form-error">
            please enter a valid mobile number (Format:07975777666)
          </p>
        )}
        <div>
          <label htmlFor="password">password</label>
          <input
            className="inputField"
            type="password"
            placeholder="password"
            id="password"
            {...register("password", {
              minLength: 8,
              required: true,
              validate: (value) => {
                if (
                  value.match(/[a-z]/g) &&
                  value.match(/[A-Z]/g) &&
                  value.match(/[0-9]/g)
                ) {
                  return true;
                } else {
                  return false;
                }
              },
            })}
            required
          />
        </div>
        {errors.password && (
          <p className="form-error">
            password must be at least 8 characters and contain at least 1
            uppercase letter, 1 lowercase letter and 1 number
          </p>
        )}
        <div>
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            className="inputField"
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => {
                if (value === getValues("password")) {
                  return true;
                } else {
                  return false;
                }
              },
            })}
            required
          />
        </div>
        {errors.confirmPassword && (
          <p className="form-error">passwords do not match</p>
        )}
        <Button
          className=" mt-4 mb-2 w-3/4 border mx-auto"
          type="submit"
          shadow="default"
          size="default"
          variant="default"
          hover="default"
          rounded="circle"
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
