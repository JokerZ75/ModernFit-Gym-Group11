"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import AutoComplete from "@/app/components/UI/AutoComplete";
import axios from "axios";

const EditAccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const { api_url, getHeaders } = useAuthContext();

  const { data: gymLocations } = useQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/branch/`, {
        headers: headers,
      });
      const options: string[] = await data.map(
        (location: any) => `${location.Name} (${location.Address})`
      );
      return options as string[];
    },
  });

  return (
    <div>
      <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
        {gymLocations ? (
          <AutoComplete
            register={
              register("gymLocation", { validate: {}, required: true }) as any
            }
            options={gymLocations}
            type="text"
            name="gymLocation"
            className="page-form-input"
            placeholder="gym location e.g (Sheffield ModernFit Gym)"
          />
        ) : (
          <input
            type="text"
            placeholder="gym location"
            {...register("gymLocationNotFilled", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
        )}
        {errors.gymLocation && (
          <p className="form-error">gym location is required</p>
        )}
        <input
          type="text"
          placeholder="name"
          {...register("name", {
            required: true,
            maxLength: 20,
            minLength: 2,
          })}
        />
        {errors.name && <p className="form-error">name is required (max 20 characters)</p>}
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: true,
            validate: (value) => {
              if (value.includes("@") && value.includes(".")) {
                return true;
              } else {
                return false;
              }
            },
          })}
        />
        {errors.email && <p className="form-error">make sure email is valid</p>}
        <input
          type="text"
          placeholder="phone number"
          {...register("phoneNumber", {
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
        {errors.phoneNumber && (
          <p className="form-error">
            make sure mobile number is valid (Format:07975777666)
          </p>
        )}
        <input
          type="text"
          placeholder="height (cm)"
          {...register("height", {
            required: true,
            minLength: 2,
            maxLength: 3,
            pattern: /[0-9]/g,
          })}
        />
        {errors.height && <p className="form-error">height is required (10-999cm)</p>}
        <input
          type="text"
          placeholder="weight (lbs)"
          {...register("weight", {
            required: true,
            minLength: 2,
            maxLength: 3,
            pattern: /[0-9]/g,
          })}
        />
        {errors.weight && <p className="form-error">weight is required (10-999lbs)</p>}
        <input
          type="text"
          placeholder="gym goals"
          {...register("gymGoals", {
            required: true,
            minLength: 3,
          })}
        />
        {errors.gymGoals && <p className="form-error">gym goals is required</p>}
        <Button
          variant="darkBlue"
          hover="hoverLightBlue"
          size="fillWidth"
          className="py-4 rounded-lg mt-3"
          type="submit"
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default EditAccountForm;
