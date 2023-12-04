"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios, { Axios, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RecoverForm: React.FC<{ token: string }> = ({ token }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { api_url, getHeaders } = useAuthContext();

  const onSubmit = async (data: FieldValues) => {
    updatePassword(data);
  };

  const Router = useRouter();
  const { mutate: updatePassword } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async (data: FieldValues) => {
      const headers = await getHeaders();
      const { data: user } = await toast.promise(
        axios.post(`${api_url}/user/reset-password/${token}`, data, {
          headers: headers,
        }),
        {
          pending: "Updating password",
          success: "Password updated",
          error: "Failed to update password",
        }
      );
      return user;
    },
    onSuccess: async (data) => {
      setTimeout(() => {
        Router.push("/login");
      }, 1000);
    },
    onError: async (error: AxiosError) => {
      console.log(error.response?.data);
      // @ts-ignore
      if (error.response?.data?.msg === "Invalid token") {
        toast.error("Link expired or invalid");
      }
      // @ts-ignore
      if (error.response?.data?.msg === "User not found") {
        toast.error("This email is invalid or not registered");
      }
      // @ts-ignore
      if (error.response?.data?.msg === "Please enter all fields") {
        toast.error("Please enter all fields");
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
        <div>
          <label htmlFor="password">password</label>
          <input
            className="!w-full"
            type="password"
            placeholder="password"
            id="password"
            {...register("Password", {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: (value) => {
                if (
                  value.match(/[a-z]/) &&
                  value.match(/[A-Z]/) &&
                  value.match(/[0-9]/)
                ) {
                  return true;
                }
                return false;
              },
            })}
          />
        </div>
        {errors.password && (
          <p className="form-error">
            password should be between 8-20 characters and container 1 lower,
            upper case character and a digit.
          </p>
        )}
        <div>
          <label htmlFor="password">confirm password</label>
          <input
            className="!w-full"
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: (value) => {
                if (value === getValues("Password")) {
                  return true;
                }
                return false;
              },
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="form-error">password does not match</p>
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
