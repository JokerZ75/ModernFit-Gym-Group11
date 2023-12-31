import React from "react";

type workout = {
  _id?: string;
  User_id: string;
  Name: string;
  Duration: number;
  Type_of_workout_name: string;
  Type_of_workout: string;
  Calories_burned: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const RecentWorkouts: React.FC<{
  workouts: workout[];
}> = ({ workouts }) => {
  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl font-bold text-blue-200">recent workouts</h2>
        <div className="mt-2">
          <ul className="overflow-y-scroll h-[250px]">
            {workouts == null && (
              <p className="text-blue-200 text-xl mt-5">
                No recent workouts...
              </p>
            )}
            {workouts?.map((workout) => {
              return (
                <li className="mt-3 first:mt-0" key={workout._id}>
                  <Workout workout={workout} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

type workoutType = {
  _id: string;
  Name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Workout: React.FC<{ workout: workout }> = ({ workout }) => {
  return (
    <div className="bg-blue-200 bg-opacity-50 rounded-xl p-2 ">
      <div className="flex">
        <p className="text-2xl font-bold text-white">{workout.Name}</p>
        <p className="ml-auto text-xl font-bold text-white">
          {workout.Duration} min
        </p>
      </div>
      <p className="font-bold">{workout.Type_of_workout_name}</p>
      <p className="font-bold">{workout.Calories_burned} Kcal</p>
    </div>
  );
};

export default RecentWorkouts;
