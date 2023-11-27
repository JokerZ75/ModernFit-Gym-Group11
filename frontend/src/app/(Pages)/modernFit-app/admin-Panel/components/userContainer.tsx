import React from "react";
import { Button } from "@/app/components/UI/Button";
import { StringToBoolean } from "class-variance-authority/types";

type props = {
    children?: React.ReactNode;
    name: string;
    permission: string;
    email: string;
    profileImage: string;
}

const UserContainer: React.FC<props> = ({children, name, permission, email, profileImage}) =>{
    let atPos = email.lastIndexOf("@");
    let emailFirstHalf
    if (atPos - 4 >= 0)
    {
        emailFirstHalf = email.substring(0, atPos - 4)
    }
    else{
        emailFirstHalf = email.substring(0, atPos)
    }
    let emailSecondHalf
    if (atPos - 2 >= 0)
    {
        emailSecondHalf = email.substring(atPos - 2, email.length)
    }
    else
    {
        emailSecondHalf = email.substring(atPos, email.length)
    }
    return (
        <div className="max-w-sm mx-auto m-4 bg-blue-100 p-1 rounded-xl">
                        <div className="flex flexbox m-3">
                            <div className="w-1/4 rounded-full overflow-hidden"> <img src={profileImage} alt="Profile Picture" height="100000" width="50000"></img> </div>
                            <div className="mx-auto w-3/4 ml-5">
                                <div className="text-white text-xl">{permission}</div>
                                <div className="text-white text-xl">{name}</div>
                                <div className="text-white text-xl">{emailFirstHalf}****{emailSecondHalf}</div>
                            </div>
                        </div>
                        <div className="mx-auto w-5/6">
                            <div className="text-center">
                                <Button
                                    shadow="default"
                                    size="small"
                                    variant="darkBlue"
                                    hover="default"
                                    rounded="circle"
                                    className="w-5/6 border mx-auto text-center m-1"
                                    >
                                    Edit Account
                                </Button>
                                <Button
                                    shadow="default"
                                    size="small"
                                    variant="default"
                                    hover="default"
                                    rounded="circle"
                                    className="w-5/6 border mx-auto text-center m-1"
                                    >
                                    Remove Account
                                </Button>
                            </div>
                        </div>
                    </div>
    );
};
export default UserContainer;