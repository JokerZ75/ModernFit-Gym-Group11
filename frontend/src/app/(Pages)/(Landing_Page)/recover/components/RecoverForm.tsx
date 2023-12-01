"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
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
        const { email } = data;
        try {
            await toast.promise(
                axios.post(`${api_url}/session/recover`, { email }),
                {
                    pending: "Sending recovery email",
                    success: "Recovery email sent",
                    error: "Failed to send recovery email",
                }
            );
        } catch (error) {
            console.error("Error sending recovery email:", error);
        }
    };

    return (
        <>
            <form
                id=""
                className="text-center modal-form"
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
                <Button
                    className="mt-4 mb-2 w-3/4 border mx-auto"
                    type="submit"
                    shadow="default"
                    size="default"
                    variant="default"
                    hover="default"
                    rounded="circle"
                >
                    Submit
                </Button>
            </form>
        </>
    );
};

export default RecoverForm;