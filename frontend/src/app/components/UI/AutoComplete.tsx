"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";

interface props {
  children: React.ReactNode;
  options: string[];
  register: UseFormRegister<FieldValues>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
}

const AutoComplete: React.FC<props> = ({
  children,
  register,
  options,
  inputProps,
  className,
}) => {
  return (
    <>
      <div className="relative">
        <input className={className} {...register("workType")} {...inputProps} />
      </div>
    </>
  );
};

export default AutoComplete;
