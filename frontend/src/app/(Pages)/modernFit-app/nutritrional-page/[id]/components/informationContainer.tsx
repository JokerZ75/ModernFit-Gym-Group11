import React from "react";
import { Button } from "@/app/components/UI/Button";

type props = {
    name: string;
    image: string;
    description: string;
    author: string;
    calories: number;
}

const InformationContainer: React.FC<props> = ({ name, image, description, author, calories}) =>{
    if (description.length > 75)
    {
        description = description.slice(0, 75);
        description += "...";
    }
    return (
        <div className="bg-blue-100 text-white mt-2 mb-4 border rounded-lg py-2 px-4 flex flex-col">
            <div className="text-xl text-left font-bold">{name}</div>
            <div className="mx-auto md:w-full "><img src={image} alt="placeholder" className="w-[400px] h-[150px] md:w-full object-cover"></img></div>
            <div className="text-base mx-auto mt-4">{description}</div>
            <div className="flex-1 w-full mx-auto font-bold text-sm">
            <div className="inline-block max-w-md mt-1">by {author} </div>
            <div className="inline-block float-right max-w-md">{calories} kcal</div>
            </div>
            <div className="text-center mt-5">
                <Button
                    shadow="default"
                    size="small"
                    variant="darkBlue"
                    hover="default"
                    rounded="circle"
                    className="w-5/6 border mx-auto text-center"
                    >
                    Open
                </Button>
            </div>
        </div>
    );
};
export default InformationContainer;
