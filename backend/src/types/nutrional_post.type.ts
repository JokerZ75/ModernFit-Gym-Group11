import { ObjectId } from "mongodb";

type nutrional_post = {
    Staff_id: string | ObjectId;
    Title: string;
    Catagory_id: string | ObjectId;
    Average_calories: number;
    Image: string;
    Content: string;
};

export default nutrional_post;