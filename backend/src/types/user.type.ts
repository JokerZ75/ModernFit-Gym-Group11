import { ObjectId } from "mongoose";

type UserType = {
  _id: string;
  Branch_id: string | ObjectId;
  Access_pin: number;
  Name: string;
  Email: string;
  Phone_number: number;
  Password: string;
  Profile_picture: string;
  Height: number;
  Weight: number;
  Gym_Goals: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default UserType;
