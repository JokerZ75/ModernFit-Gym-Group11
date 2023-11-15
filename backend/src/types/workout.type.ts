import { ObjectId } from 'mongodb';
type workout = {
  _id?: string | ObjectId;
  User_id: string | ObjectId;
  Name: string;
  Duration: number;
  Type_of_workout: string | ObjectId;
  Type_of_workout_Name?: string;
  Calories_burned: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default workout;
