"use client"
import AutoComplete from "@/app/components/UI/AutoComplete";
import React from "react";
import { useForm, FieldValues } from "react-hook-form"


const SearchBar: React.FC = () =>{

        // FETCH THE USER WHO ARENT STAFF, PASS THOSE AS THE OPTIONS TO AUTOCOMPLETE

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();

      const onSubmit = (data:FieldValues) => {
        console.log(data);
      }

      const options = [
        "User",
        "User2"
      ]

    return(
        <>
            <form className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-black" onSubmit={handleSubmit(onSubmit)}>
                <AutoComplete register={register("searchValue") as any} options={options}  id="searchMembers" className="" placeholder="Search" type="text" />
            </form>
        </>
    );
};

export default SearchBar;
