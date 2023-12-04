"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import { FieldValues, set, useForm } from "react-hook-form";
import AutoComplete from "@/app/components/UI/AutoComplete";
import axios from "axios";

type userType = {
  _id?: string;
  Access_pin?: number;
  Name: string;
  Email: string;
  Phone_number: number;
  Profile_picture?: string;
  Height: number;
  Weight: number;
  Branch_id: string;
  Gym_Goals: string;
};

type branchType = {
  _id: string;
  Name: string;
  Address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const EditAccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const gymLocationID = gymLocations?.find(
      (location) => location.Name === data.gymLocation.split("-")[0]
    )?._id;
    if (gymLocationID == undefined) {
      setError("gymLocation", {
        type: "manual",
        message: "please enter a valid gym location",
      });
      return;
    }
    if (gymLocationID) {
      updateAccountDetails({
        Name: data.name,
        Email: data.email,
        Phone_number: data.phoneNumber,
        Height: data.height,
        Weight: data.weight,
        Branch_id: gymLocationID,
        Gym_Goals: data.gymGoals,
      });
    }
  };

  const { api_url, getHeaders } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate: updateAccountDetails } = useMutation({
    mutationFn: async (data: userType) => {
      const headers = await getHeaders();
      await toast.promise(
        axios.post(`${api_url}/user/update`, data, {
          headers: headers,
        }),
        {
          pending: "saving...",
          success: "saved",
          error: "error",
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accountDetails"] });
      queryClient.invalidateQueries({ queryKey: ["gymLocations"] });
      queryClient.invalidateQueries({ queryKey: ["classesAtGym"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingclasses"] });
    },
  });

  const { data: gymLocations } = useQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/branch/`, {
        headers: headers,
      });
      return data as branchType[];
    },
  });

  const { data: accountDetails } = useQuery({
    queryKey: ["accountDetails"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/user/`, {
        headers: headers,
      });
      return data as userType;
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
            options={gymLocations.map(
              (location) => `${location.Name}-(${location.Address})`
            )}
            fetchedData={`${
              // doing what options does but finding the value of the option that matches the current value a users fetched data
              gymLocations?.find(
                (location) => location._id === accountDetails?.Branch_id
              )?.Name
            }-(${
              gymLocations?.find(
                (location) => location._id === accountDetails?.Branch_id
              )?.Address
            })`}
            type="text"
            className="page-form-input"
            placeholder="gym location e.g (Sheffield ModernFit Gym)"
            setValue={setValue}
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
          defaultValue={accountDetails?.Name}
        />
        {errors.name && (
          <p className="form-error">name is required (max 20 characters)</p>
        )}
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
          defaultValue={accountDetails?.Email}
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
          defaultValue={accountDetails?.Phone_number}
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
          defaultValue={accountDetails?.Height}
        />
        {errors.height && (
          <p className="form-error">height is required (10-999cm)</p>
        )}
        <input
          type="text"
          placeholder="weight (lbs)"
          {...register("weight", {
            required: true,
            minLength: 2,
            maxLength: 3,
            pattern: /[0-9]/g,
          })}
          defaultValue={accountDetails?.Weight}
        />
        {errors.weight && (
          <p className="form-error">weight is required (10-999lbs)</p>
        )}
        <input
          type="text"
          placeholder="gym goals"
          {...register("gymGoals", {
            required: true,
            minLength: 3,
          })}
          defaultValue={accountDetails?.Gym_Goals}
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
