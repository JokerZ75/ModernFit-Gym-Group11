"use client";

import React from "react";
import { Button } from "@/app/components/UI/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";

const DeleteAccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { api_url, Headers } = useAuthContext();

  const onSubmit = async (data: FieldValues) => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FieldValues) => {
      await toast
        .promise(
          axios.delete(`${api_url}/user/delete`, {
            headers: Headers,
            data: { Name: data.username },
          }),
          {
            pending: "Deleting account...",
            success: "Account deleted!",
            error: "Failed to delete account. Please try again.",
          }
        )
        .then(() => {
          window.location.reload();
        });
    },
  });

  return (
    <form className="md:flex mt-5" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="page-form-input md:w-2/5"
        type="text"
        placeholder="Username (type to delete)"
        {...register("username", {
          required: true,
          maxLength: 20,
          minLength: 2,
        })}
      />
      <Button
        variant="default"
        hover="default"
        shadow="default"
        size="fillWidth"
        className="md:w-3/5 py-4 rounded-lg mt-3 md:my-auto md:ml-3"
      >
        delete account
      </Button>
    </form>
  );
};

export default DeleteAccountForm;
