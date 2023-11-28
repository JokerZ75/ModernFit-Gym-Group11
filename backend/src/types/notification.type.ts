import { ObjectId } from "mongoose";

type notification = {
    _id?: string;
    Title: string;
    Description: string;
    isForAll: boolean;
    isSystemFlagged: boolean;
    Recievers: string[] | ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default notification;