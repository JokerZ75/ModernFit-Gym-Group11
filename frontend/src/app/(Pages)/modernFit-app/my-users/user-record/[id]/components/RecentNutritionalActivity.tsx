import React from "react";

type meal = {
  _id: string;
  User_id: string;
  Meal_desc: string;
  Portion: number;
  Calories_intake: number;
  Catagory_name: string;
  Catagory_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const RecentNutritionalActivity: React.FC<{
  meals: meal[];
}> = ({ meals }) => {
  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">
          recent nutritional activity
        </h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {meals == null && (
              <p className="text-blue-200 text-xl mt-5">No recent meals...</p>
            )}
            {meals?.map((meal) => {
              return (
                <li className="mt-3 first:mt-0" key={meal._id}>
                  <Meal meal={meal} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const Meal: React.FC<{ meal: meal }> = ({ meal }) => {
  return (
    <>
      <div className="bg-blue-200 bg-opacity-50 p-4 mt-3 rounded-xl">
        <div className="notification-head flex font-bold">
          <p className="font-bold text-2xl  text-white">{meal.Meal_desc}</p>
          <p className="ml-auto text-xl  text-white whitespace-nowrap">
            {meal.Calories_intake} Kcal
          </p>
        </div>
        <p className="font-bold">{meal.Catagory_name}</p>
        <p className="font-bold">{meal.Portion} portions</p>
      </div>
    </>
  );
};

export default RecentNutritionalActivity;
