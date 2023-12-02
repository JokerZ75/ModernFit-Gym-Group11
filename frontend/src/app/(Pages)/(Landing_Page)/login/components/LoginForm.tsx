"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const faRef = React.useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FieldValues) => {
    const { email, password, authCode } = data;
    console.log(email, password, authCode);
    if (authCode) {
      LoginToSystem({ email, password, authCode });
    } else {
      SendFor2FA({ email, password });
    }
  };

  const { api_url, getHeaders, login } = useAuthContext();

  const { mutate: LoginToSystem } = useMutation({
    mutationKey: ["LoginToSystem"],
    mutationFn: async (emailPasswordandAuth: any) => {
      const headers = await getHeaders();
      const { data } = await toast.promise(
        axios.post(`${api_url}/session/login`, emailPasswordandAuth, {
          headers: headers,
        }),
        {
          pending: "Logging in",
          success: "Logged in",
          error: "Failed to login",
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      login(data);
      setTimeout(() => {
        window.location.href = "/modernFit-app/dashboard";
      }, 2000);
    },
    onError: async (error: any) => {
      if (error.response?.data?.msg === "Invalid details") {
        toast.error("Email or password is incorrect");
      }
      if (error.response?.data?.msg === "Invalid auth code") {
        toast.error("Invalid 2FA code");
      } 
    },
  });

  const { mutate: SendFor2FA } = useMutation({
    mutationKey: ["SendFor2FA"],
    mutationFn: async (emailAndPassword: any) => {
      const headers = await getHeaders();
      await toast.promise(
        axios.post(`${api_url}/session/2FA`, emailAndPassword, {
          headers: headers,
        }),
        {
          pending: "Sending 2FA code",
          success: "2FA code sent",
          error: "Failed to send 2FA code",
        }
      );
    },
    onSuccess: (data) => {
      faRef.current?.classList.remove("!hidden");
    },
    onError: async (error: any) => {
      if (error.response?.data?.msg === "Invalid details") {
        toast.error("Email or password is incorrect");
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
          <label htmlFor="password">password</label>
          <input
            className="inputField"
            type="password"
            placeholder="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && <p className="form-error">Password is required</p>}
        <div ref={faRef} className="!hidden">
          <label htmlFor="authCode">Two-Factor Authentication (2FA)</label>
          <input
            className="inputField"
            type="text"
            placeholder="Enter your 2FA code"
            id="authCode"
            {...register("authCode", { required: false })}
          />
        </div>
        {errors["authCode"] && (
          <p className="form-error">Please enter your 2FA code</p>
        )}
        <Link href="/recover" passHref className="inline">
            <p className="text-blue-200 font-bold text-sm my-1 hover:text-orange-200 hover:brightness-125 transition-all duration-500 ease-in-out inline">
              forgot password?
            </p>
        </Link>
        <Button
          className="mt-2 mb-2 w-3/4 border mx-auto"
          type="submit"
          shadow="default"
          size="default"
          variant="default"
          hover="default"
          rounded="circle"
        >
          login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
