import React from "react";
import map from "@/app/Assets/maps.jpg";

type dietPlan = {
  User_id: string;
  Staff_id: string;
  Plan: {
    Monday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Tuesday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Wednesday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Thursday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
    Friday: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snack: string;
    };
  };
};

interface tableProps {
  plan: dietPlan;
}

const ProgramTable: React.FC<tableProps> = ({ plan }) => {
  const Monday = plan.Plan?.Monday;
  const Tuesday = plan.Plan?.Tuesday;
  const Wednesday = plan.Plan?.Wednesday;
  const Thursday = plan.Plan?.Thursday;
  const Friday = plan.Plan?.Friday;

  return (
    <table className="mt-2 w-full">
      <tbody className="flex flex-col h-[400px] overflow-y-scroll md:h-auto md:overscroll-y-none">
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%] ">
            <p className="md:my-auto md:mx-auto">Monday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 flex flex-col gap-3 md:w-full">
            <p>Breakfast: {Monday.Breakfast}</p>
            <p>Lunch: {Monday.Lunch}</p>
            <p>Dinner: {Monday.Dinner}</p>
            <p>Snack: {Monday.Snack}</p>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row md:border-b-2 ">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%]">
            <p className="md:my-auto md:mx-auto">Tuesday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 flex flex-col gap-3 md:w-full">
            <p>Breakfast: {Tuesday.Breakfast}</p>
            <p>Lunch: {Tuesday.Lunch}</p>
            <p>Dinner: {Tuesday.Dinner}</p>
            <p>Snack: {Tuesday.Snack}</p>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%]">
            <p className="md:mx-auto my-auto">Wednesday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 flex flex-col gap-3 md:w-full">
            <p>Breakfast: {Wednesday.Breakfast}</p>
            <p>Lunch: {Wednesday.Lunch}</p>
            <p>Dinner: {Wednesday.Dinner}</p>
            <p>Snack: {Wednesday.Snack}</p>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row  md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%]">
            <p className="md:mx-auto my-auto">Thursday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 flex flex-col gap-3 md:w-full">
            <p>Breakfast: {Thursday.Breakfast}</p>
            <p>Lunch: {Thursday.Lunch}</p>
            <p>Dinner: {Thursday.Dinner}</p>
            <p>Snack: {Thursday.Snack}</p>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%]">
            <p className="md:mx-auto my-auto">Friday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 flex flex-col gap-3 md:w-full">
            <p>Breakfast: {Friday.Breakfast}</p>
            <p>Lunch: {Friday.Lunch}</p>
            <p>Dinner: {Friday.Dinner}</p>
            <p>Snack: {Friday.Snack}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProgramTable;
