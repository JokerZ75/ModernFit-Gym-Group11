import { ObjectId } from "mongoose";

type classType = {
  _id?: string | ObjectId;
  Owner_id: string | ObjectId;
  Name: string;
  Date: Date;
  Time: Date;
  Duration: number;
  Branch_id: string | ObjectId;
  Interested_users?: string[] | ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default classType;