"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/app/components/UI/Button";
import { StringToBoolean } from "class-variance-authority/types";
import { get } from "http";


type props = {
  children?: React.ReactNode;
  name: string;
  permission: string;
  email: string;
  profileImage: string;
};

const User: React.FC<props> = ({
  children,
  name,
  permission,
  email,
  profileImage,
}) => {
  
  const [image, setImage] = React.useState(profileImage);

  React.useEffect(() => {
    axios
      .get(profileImage)
      .then((res) => {
        setImage(profileImage);
      })
      .catch((err) => {
        setImage("");
      });
  }, []);
  //delete user
  const deleteUser = async () => {
    const { api_url, getHeaders } = useAuthContext();
    const { data: user } = useMutation({
      mutationKey: ["user"],
      mutationFn: async () => {
        const headers = await getHeaders();
        const { data } = await axios.get(`${api_url}/users/${User}`, {
          headers: headers,
        });
        return data as any[];
      },
    });
    
  }
  return (
    <div className="md:w-[450px] w-[350px] mx-auto m-4 bg-blue-100 p-1 rounded-xl">
      <div className="flex m-3">
        <div className="">
          {image === "" ? (
            <img
              src="https://placehold.co/300x300"
              alt="Profile Picture"
              className="w-[75px] h-[75px] rounded-full"
            />
          ) : (
            <img
              src={`${image}`}
              alt="Profile Picture"
              className="w-[75px] h-[75px] rounded-full"
            />
          )}
        </div>
        <div className="mx-auto w-3/4 ml-5">
          <div className="text-white text-xl">{permission}</div>
          <div className="text-white text-xl">{name}</div>
          <div className="text-white text-xl">{email}</div>
        </div>
      </div>
      <div className="mx-auto w-5/6">
        <div className="text-center">
          <Button
            shadow="default"
            size="small"
            variant="darkBlue"
            hover="default"
            rounded="circle"
            className="w-5/6 border mx-auto text-center m-1"
          >
            Edit Account
          </Button>
          <Button
            shadow="default"
            size="small"
            variant="default"
            hover="default"
            rounded="circle"
            className="w-5/6 border mx-auto text-center m-1"
            //delete user from database on button click
            onClick={() => {deleteUser();}}
          
          >
            Remove Account
          </Button>
        </div>
      </div>
    </div>
  );
};
export default User;
