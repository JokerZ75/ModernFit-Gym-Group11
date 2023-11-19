import React from "react";

type workout_plan = {
  User_id: string;
  Staff_id: string;
  Plan: {
    Monday: {
      WorkoutsList: string[];
    };
    Tuesday: {
      WorkoutsList: string[];
    };
    Wednesday: {
      WorkoutsList: string[];
    };
    Thursday: {
      WorkoutsList: string[];
    };
    Friday: {
      WorkoutsList: string[];
    };
  };
};

interface tableProps {
  plan: workout_plan;
}

const ProgramTableWorkout: React.FC<tableProps> = ({ plan }) => {
  const Monday = plan.Plan?.Monday.WorkoutsList;
  const Tuesday = plan.Plan?.Tuesday.WorkoutsList;
  const Wednesday = plan.Plan?.Wednesday.WorkoutsList;
  const Thursday = plan.Plan?.Thursday.WorkoutsList;
  const Friday = plan.Plan?.Friday.WorkoutsList;

  return (
    <table className=" mt-2">
      <tbody className="flex flex-col">
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%]">
            <p className="md:mx-auto md:my-auto">Monday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 md:w-full">
            <ol className="list-decimal">
              {Monday.map((workout) => {
                return <li className="ml-5">{workout}</li>;
              })}
            </ol>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%] ">
            <p className="md:mx-auto md:my-auto">Tuesday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2 md:w-full">
            <ol className="list-decimal">
              {Tuesday.map((workout) => {
                return <li className="ml-5">{workout}</li>;
              })}
            </ol>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%] ">
            <p className="md:mx-auto md:my-auto">Wednesday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2  md:w-full">
            <ol className="list-decimal">
              {Wednesday.map((workout) => {
                return <li className="ml-5">{workout}</li>;
              })}
            </ol>
          </td>
        </tr>
        <tr className="flex flex-col  md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%] ">
            <p className="md:mx-auto md:my-auto">Thursday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2  md:w-full">
            <ol className="list-decimal">
              {Thursday.map((workout) => {
                return <li className="ml-5">{workout}</li>;
              })}
            </ol>
          </td>
        </tr>
        <tr className="flex flex-col md:flex-row md:border-b-2">
          <th className="bg-blue-200 bg-opacity-50 p-4 text-xl text-white md:flex md:w-[15%] ">
            <p className="md:mx-auto md:my-auto">Friday</p>
          </th>
          <td className="bg-blue-100 bg-opacity-50 p-2  md:w-full">
            <ol className="list-decimal">
              {Friday.map((workout) => {
                return <li className="ml-5">{workout}</li>;
              })}
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProgramTableWorkout;
