"use client";
import React from "react";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { Button } from "@/app/components/UI/Button";

const ProfileImage: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { api_url, getHeaders } = useAuthContext();
  const formRef = React.useRef<HTMLFormElement>(null);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);
    console.log(formData);
  };

  return (
    <div>
      <div className="relative">
        <img
          src="https://placehold.co/200x200"
          className="block rounded-full m-4 ml-auto mr-auto profile-scaling object-cover"
          alt="account profile picture"
        />
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="absolute flex top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out  profile-scaling rounded-full"
        >
          <label
            htmlFor="profileImage"
            ref={labelRef}
            className="mx-auto my-auto font-bold text-white text-2xl"
          >
            Upload Image
          </label>
          <input
            type="file"
            className="fixed opacity-0"
            accept="image/*"
            {...register("profileImage", { required: true })}
            id="profileImage"
            onChange={async () => {
                labelRef.current!.innerText = formRef.current!.profileImage.files[0].name;
                formRef.current!.classList.remove("opacity-0")
            }}
          />
        </form>
      </div>
      <Button
        variant="darkBlue"
        hover="hoverLightBlue"
        className="rounded-lg"
        size="fillWidth"
        type="submit"
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
      >
        Upload
      </Button>
    </div>
  );
};

export default ProfileImage;
