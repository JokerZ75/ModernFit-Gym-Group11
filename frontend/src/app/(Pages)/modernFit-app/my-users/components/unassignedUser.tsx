import React from "react";
import { Button } from "@/app/components/UI/Button";

type props = {
    children?: React.ReactNode;
    firstName: string;
    lastName: string;
    profileImage: string;
    goals: string;
    height: string;
    weight: number;
}

const UnassignedUser: React.FC<props> = ({children, firstName, lastName, profileImage, goals, height, weight}) =>{
    if (goals.length > 30)
    {
        goals = goals.slice(0, 30);
        goals += "...";
    }
    return (
        <div className="max-w-sm mx-auto m-4 bg-blue-100 p-1 rounded-xl">
            <div className="flex flexbox m-3">
                <div className="w-1/4 rounded-full overflow-hidden"> <img src={profileImage} alt="Profile Picture" height="100000" width="50000"></img> </div>
                <div className="mx-auto w-3/4 ml-5">
                    <div className="text-white text-xl">{firstName} {lastName}</div>
                    <div className="text-black text-lg"> {height} {weight}lbs </div>
                </div>
            </div>
            <div className="mx-auto w-5/6">
                <div className="text-black"> {firstName}&#39;s gym goals are: {goals}  </div>
                <div className="text-white font-bold underline"><a href="#">Veiw Records</a></div>
                <div className="text-center">
                    <Button
                        shadow="default"
                        size="small"
                        variant="darkBlue"
                        hover="default"
                        rounded="circle"
                        className="w-5/6 border mx-auto text-center m-1"
                        >
                        Assign Self
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default UnassignedUser;
