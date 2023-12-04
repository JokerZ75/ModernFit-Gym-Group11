"use client";
import AutoComplete from "@/app/components/UI/AutoComplete";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";

type userType = {
  _id: string;
  Name: string;
  Email: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
};

const SearchBar: React.FC = () => {
  const { getHeaders, api_url } = useAuthContext();


  const { data: options } = useQuery({
    queryKey: ["assignedUsersOptions"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/staff/assigned/`, {
        headers: headers,
      });
      // return array of names
      if (data.length === 0) return ["No users found"];
      const names = data.map((user: any) => user.Name);
      return names as string[];
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();

  const queryClient = useQueryClient();

  const [originalUsers, setOriginalUsers] = React.useState<userType[] | null>();

  React.useEffect(() => {
    setOriginalUsers(queryClient.getQueryData(["assignedUsers"]));
  }, [options]);

  const { mutate: searchUser } = useMutation({
    mutationKey: ["assignedUsers", getValues().searchValue],
    mutationFn: async (searchValue: string) => {
      if (!originalUsers) return;
      queryClient.setQueryData(["assignedUsers"], [...originalUsers]);
      queryClient.setQueryData(["assignedUsers"], (old: any) => {
        const filtered = old?.filter((user: any) =>
          user.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filtered.length === 0) return null;
        return filtered;
      });
    },
  });

  return (
    <>
      <form className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-black">
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
