import React from "react";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery, useMutationState } from "@tanstack/react-query";
import axios from "axios";

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
const RecentNutritionalActivity: React.FC<{
  meals: meal[];
  mealCatagories: mealCatagory[];
}> = ({ meals, mealCatagories }) => {
  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">
          recent nutritional activity
        </h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {meals?.map((meal) => {
              return (
                <li className="mt-3 first:mt-0" key={meal._id}>
                  <Meal meal={meal} mealCatagories={mealCatagories} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

type mealCatagory = {
  _id: string;
  Name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Meal: React.FC<{ meal: meal; mealCatagories: mealCatagory[] }> = ({
  meal,
  mealCatagories,
}) => {
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
          {
            mealCatagories?.find((cata: any) => meal?.Catagory_id === cata?._id)
              ?.Name
          }
        </p>
        <p className="font-bold">{meal.Portion} portions</p>
      </div>
    </>
  );
};

export default RecentNutritionalActivity;
