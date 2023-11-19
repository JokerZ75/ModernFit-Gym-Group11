"use client";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import router, { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/session/login", {
        email: data.email,
        password: data.password,
      });

      router.push("/home");
      console.log("Login successful", response.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 422) {
          setApiError("Invalid email or password");
        } else {
          console.error("Login failed", error);
          setApiError("An unexpected error occurred");
        }
      } else {
        console.error("Unexpected error", error);
        setApiError("An unexpected error occurred");
      }
    }
  };


  return (
    <>
      <form
        id="register-form"
        className="text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="inputField"
            type="text"
            placeholder="example@example.com"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && (
          <p className="form-error">Please enter a valid email</p>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="inputField"
            type="password"
            placeholder="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
            <p className="form-error">Password is required</p>
        )}
        <div>
          <label htmlFor="2fa">Two-Factor Authentication (2FA)</label>
          <input
            className="inputField"
            type="text"
            placeholder="Enter your 2FA code"
            id="2fa"
            {...register("2fa", { required: true })}
          />
        </div>
        {errors["2fa"] && (
          <p className="form-error">Please enter your 2FA code</p>
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
          Login
        </Button>
      </form>
    </>
  );
}  

export default LoginForm;