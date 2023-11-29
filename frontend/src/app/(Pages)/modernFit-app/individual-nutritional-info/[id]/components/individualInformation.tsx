import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";

type props = {
    title: string;
    catagory: string;
    image: string;
    description: string;
    author: string;
    calories: number;
}

const IndividualInformation: React.FC<props> = async ({ title, catagory ,image, description, author, calories}) =>{
    await axios.get(image).then((res) => {
        console.log(res);
    }).catch((err) => {
        image = "https://placeholder.com/400x150"
    });
    return (
        <div className="bg-blue-100 rounded-xl text-white text-center">
                <div className="w-5/6 mx-auto">
                    <h1 className="mx-auto font-bold text-5xl p-5">{title}</h1>
                    <div className="text-2xl p-1">{catagory}</div>
                    <div className="text-2xl p-1">{calories} kcal</div>
                    <div className="mx-auto p-2 "><img src={image} alt="placeholder" className="mx-auto object-cover rounded-xl overflow-hidden max-h-80"/></div>
                    <div className="p-2">{description}</div>
                    <div className="text-right font-bold p-3">by {author}</div>
                </div>
            </div>
    );
};
export default IndividualInformation;