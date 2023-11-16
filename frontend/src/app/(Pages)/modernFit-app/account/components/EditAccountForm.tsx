"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import AutoComplete from "@/app/components/UI/AutoComplete";
const EditAccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { api_url, Headers } = useAuthContext();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
        <AutoComplete register={register("gymLocation") as any} options={["gym1", "gym2", "gym3"]} type="text" name="gymLocation" className="page-form-input" />
        <input
          type="text"
          placeholder="name"
          {...register("name", {
            required: true,
            maxLength: 20,
            minLength: 2,
          })}
        />
        {errors.name && <p className="form-error">name is required</p>}
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
        {errors.height && <p className="form-error">height is required</p>}
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
        {errors.weight && <p className="form-error">weight is required</p>}
        <input
          type="text"
          placeholder="gym goals"
          {...register("gymGoals", {
            required: true,
            minLength:3,
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
