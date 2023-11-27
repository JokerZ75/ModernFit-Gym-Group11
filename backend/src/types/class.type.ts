import { ObjectId } from "mongoose";

type classType = {
  _id?: string | ObjectId;
  Owner_id: string | ObjectId;
  Name: string;
  Date: Date;
  Type: "ongoing" | "cancelled";
  Duration: number;
  Branch_id: string | ObjectId;
  Interested_users?: string[] | ObjectId[] | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export default classType;
