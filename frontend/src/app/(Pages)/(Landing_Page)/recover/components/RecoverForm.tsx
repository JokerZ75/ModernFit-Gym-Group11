"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";

const RecoverForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { api_url, getHeaders } = useAuthContext();

  const onSubmit = async (data: FieldValues) => {
    SendRecover(data);
  };

  const { mutate: SendRecover } = useMutation({
    mutationKey: ["SendRecover"],
    mutationFn: async (data: FieldValues) => {
      const headers = await getHeaders();
      await toast.promise(
        axios.post(`${api_url}/user/recover-account`, data, {
          headers: headers,
        }),
        {
          pending: "Sending recovery email",
          success: "Recovery email sent",
          error: "Failed to send recovery email",
        }
      );
    },
    onError: async (error: AxiosError) => {
      console.log(error.response?.data);
      // @ts-ignore
      if (error.response?.data?.msg === "User not found") {
        toast.error("This email is not registered");
      }
    },
  });

  return (
    <>
      <form
        id=""
        className="text-center modal-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">email</label>
          <input
            className="!w-full"
            type="text"
            placeholder="example@example.com"
            id="email"
            {...register("Email", {
              required: true,
              pattern: /^\S+@\S+$/i,
              validate: (value) => {
                if (value.includes("@") && value.includes(".")) {
                  return true;
                }
                return false;
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="form-error">Please enter a valid email</p>
        )}
        <Button
          className="mt-4 mb-2 w-3/4 border mx-auto"
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

export default RecoverForm;
