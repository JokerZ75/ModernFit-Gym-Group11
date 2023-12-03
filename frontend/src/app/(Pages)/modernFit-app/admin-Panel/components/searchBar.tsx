"use client";
import AutoComplete from "@/app/components/UI/AutoComplete";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";

type UserType = {
  _id: string;
  Branch_id: string;
  Access_pin: number;
  Name: string;
  Email: string;
  Phone_number: number;
  Password: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const SearchBar: React.FC = () => {
  const { getHeaders, api_url } = useAuthContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const { data: options } = useQuery({
    queryKey: ["usersNames"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/user/allUsers`, {
        headers: headers,
      });
      // return array of names
      const names = data.map((user: any) => user.Name);
      return names as string[];
    },
  });

  const queryClient = useQueryClient();

  const [originalUsers, setOriginalUsers] = React.useState<UserType[] | null>();

  React.useEffect(() => {
    setOriginalUsers(queryClient.getQueryData(["users"]));
  }, []);

  const { mutate: searchUser } = useMutation({
    mutationKey: ["searchUsers", getValues().searchValue],
    mutationFn: async (searchValue: string) => {
      if (!originalUsers) return;
      queryClient.setQueryData(["users"], [...originalUsers]);
      queryClient.setQueryData(["users"], (old: any) => {
        return old?.filter((user: any) =>
          user.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    },
  });

  return (
    <>
      <form
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        {options && (
          <AutoComplete
            register={register("searchValue") as any}
            options={options}
            id="searchMembers"
            className="page-form-input"
            placeholder="Search"
            type="text"
            extraOnChangeFn={searchUser}
            setValue={setValue}
          />
        )}
      </form>
    </>
  );
};

export default SearchBar;
