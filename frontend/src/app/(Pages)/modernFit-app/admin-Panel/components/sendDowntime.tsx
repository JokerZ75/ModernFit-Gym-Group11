"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { Button } from "@/app/components/UI/Button";
import { toast } from "react-toastify";
import { useForm, FieldValues } from "react-hook-form";
import AutoComplete from "@/app/components/UI/AutoComplete";

const SendDowntime: React.FC<{ children?: React.ReactNode }> = () => {
  const { getHeaders, api_url } = useAuthContext();

  const [checked, setChecked] = React.useState(false);

  const { data: gymLocations } = useQuery({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      const { data } = await axios.get(`${api_url}/branch/`);
      return data as any[];
    },
  });

  const divRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form className="modal-form text-center" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="downTime">Down time starts</label>
        <input
          type="datetime-local"
          className="modal-form-input"
          id="downTime"
          {...register("downTime", { required: true })}
        />
      </div>
      {errors.downTime && (
        <p className="form-error">please enter a down time</p>
      )}
      <div>
        <label htmlFor="upTime">Down time ends</label>
        <input
          type="datetime-local"
          className="modal-form-input"
          id="upTime"
          {...register("upTime", { required: true })}
        />
      </div>
      {errors.upTime && <p className="form-error">please enter a up time</p>}
      {!checked && (
        <>
          <div ref={divRef}>
            <label htmlFor="gymLocation" className="">
              gym location
            </label>
            {gymLocations && (
              <AutoComplete
                className="modal-form-input  !ml-0"
                containerDivClassName="flex-grow w-3/5 ml-1"
                id="gymLocation"
                register={...register("gymLocation", { required: true }) as any}
                options={gymLocations?.map(
                  (location) => `${location.Name}-(${location.Address})`
                )}
                placeholder="gym location e.g (Sheffield ModernFit Gym)"
                setValue={setValue}
              />
            )}
          </div>
          {errors.gymLocation && (
            <p className="form-error">please enter a gym location</p>
          )}
        </>
      )}
      <div>
        {/* check box is all */}
        <label htmlFor="all">all gyms or systemn?</label>
        <input
          type="checkbox"
          className="modal-form-input"
          id="all"
          {...register("all")}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      </div>
      <Button
        size="default"
        shadow="default"
        type="submit"
        variant="darkBlue"
        hover="hoverLightBlue"
        className="mt-4 w-1/2 mx-auto rounded-lg"
      >
        Submit
      </Button>
    </form>
  );
};

export default SendDowntime;
