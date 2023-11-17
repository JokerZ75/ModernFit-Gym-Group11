"use client";

import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";

interface TwoFactorAuthProps {
  email: string;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/two-factor-auth", {
        email,
        code: data.code,
      });

      console.log("Two-factor authentication successful", response.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setApiError("Invalid two-factor authentication code");
        } else {
          console.error("Two-factor authentication failed", error);
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
        id="two-factor-auth-form"
        className="text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="code">Two-Factor Authentication Code</label>
          <input
            className="inputField"
            type="text"
            placeholder="Enter your 2FA code"
            id="code"
            {...register("code", { required: true })}
          />
        </div>
        {errors.code && <p className="form-error">Please enter your 2FA code</p>}
        {apiError && <p className="form-error">{apiError}</p>}
        <Button
          className="mt-4 mb-2 w-3/4 border mx-auto"
          type="submit"
          shadow="default"
          size="default"
          variant="default"
          hover="default"
          rounded="circle"
        >
          Verify
        </Button>
      </form>
    </>
  );
};

export default TwoFactorAuth;