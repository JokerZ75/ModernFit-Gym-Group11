import React from "react";
import { Button } from "@/app/components/UI/Button";

type props = {
    children?: React.ReactNode;
    name: string;
    image: string;
    description: string;
    author: string;
    calories: number;
}

const InformationContainer: React.FC<props> = ({children, name, image, description, author, calories}) =>{
    if (description.length > 75)
    {
        description = description.slice(0, 75);
        description += "...";
    }
    return (
        <div className="bg-blue-100 text-white w-3/5 mx-auto text-sm mt-2 mb-4 border rounded-lg py-2">
            <div className="text-xl text-left font-bold mx-4">{name}</div>
            <div className="resize mx-auto w-5/6"><img src={image} alt="placeholder" height="100000" width="50000"></img></div>
            <div className="text-base mx-auto w-5/6">{description}</div>
            <div className="flex-1 w-5/6 mx-auto font-bold text-sm">
            <div className="inline-block max-w-md">by {author} </div>
            <div className="inline-block float-right max-w-md">{calories} kcal</div>
            </div>
            <div className="text-center">
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
