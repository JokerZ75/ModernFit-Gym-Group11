import { ObjectId } from "mongoose";

type type_of_workout = {
  _id?: string | ObjectId;
  Name: string;
  Avg_calories_burned: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default type_of_workout;
