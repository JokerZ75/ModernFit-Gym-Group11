"use client";

import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery, useMutationState } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/app/components/UI/Button";
import Modal from "@/app/components/Modal";
import CreateMeal from "./createMeal";
import { randomBytes, randomInt } from "crypto";

type meal = {
  _id: string;
  User_id: string;
  Meal_desc: string;
  Portion: number;
  Calories_intake: number;
  Catagory_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const RecentNutritionalActivity: React.FC = () => {
  const { api_url, getHeaders } = useAuthContext();
  const [openModal, setOpenModal] = React.useState(false);
  const { data } = useQuery({
    queryKey: ["nutritionalActivity"],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(`${api_url}/meal/user`, {
        headers: headers,
      });
      return data as meal[];
    },
  });

  const variables = useMutationState<meal>({
    filters: { mutationKey: ["createMeal"], status: "pending" },
    select: (mutation) => mutation.state.variables as meal,
  });

  return (
    <>
      {openModal && (
        <Modal withRouter={false} closeModal={setOpenModal}>
          <CreateMeal setModalOpen={setOpenModal} />
        </Modal>
      )}
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">
          recent nutritional activity
        </h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {data?.map((meal) => {
              return (
                <li className="mt-3 first:mt-0" key={meal._id}>
                  <Meal meal={meal} />
                </li>
              );
            })}
            {variables?.map((meal) => {
              return (
                <li
                  className="mt-3 first:mt-0"
                  key={meal.Meal_desc + meal.Catagory_id + randomBytes(12)}
                >
                  {meal._id}
                  <Meal meal={meal} />
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="darkBlue"
          shadow="default"
          rounded="square"
          className=" mx-auto rounded-xl mt-4 py-4"
          hover="hoverLightBlue"
          size="fillWidth"
          onClick={() => setOpenModal(true)}
        >
          add meal/food
        </Button>
      </div>
    </>
  );
};

const Meal: React.FC<{ meal: meal }> = ({ meal }) => {
  const { api_url } = useAuthContext();
  const { data } = useQuery({
    queryKey: ["mealcatagories"],
    queryFn: async () => {
      const { data } = await axios.get(`${api_url}/mealcatagory/`);
      return data as any[];
    },
  });

  return (
    <>
      <div className="bg-blue-200 bg-opacity-50 p-4 mt-3 rounded-xl">
        <div className="notification-head flex font-bold">
          <p className="font-bold text-2xl  text-white">{meal.Meal_desc}</p>
          <p className="ml-auto text-xl  text-white whitespace-nowrap">
            {meal.Calories_intake} Kcal
          </p>
        </div>
        <p className="font-bold">
          {data?.find((cata: any) => meal?.Catagory_id === cata?._id).Name}
        </p>
        <p className="font-bold">{meal.Portion} portions</p>
      </div>
    </>
  );
};

export default RecentNutritionalActivity;
