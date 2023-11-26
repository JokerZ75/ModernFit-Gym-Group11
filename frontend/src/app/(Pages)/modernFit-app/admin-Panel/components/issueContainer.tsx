import React from "react";
import { Button } from "@/app/components/UI/Button";

type props = {
    children?: React.ReactNode;
    issue: string;
    description: string;
    date: string;
    time: string;
}

const IssueContainer: React.FC<props> = ({children, issue, description, date, time}) =>{
    return (
        <div className="text-sm text-black bg-blue-100 m-2 p-2 w-5/6 mx-auto max-w-sm rounded-lg">
            <div className="m-1">
                <div className="flex flexbox mt-2 mb-2">
                    <div className="w-1/2 text-left">{issue}</div>
                    <div className="w-1/2 text-right">{date} {time}</div>
                </div>
                <div className="mt-2 mb-2">{description}</div>
                <div className="text-center">
                    <Button
                        shadow="default"
                        size="small"
                        variant="darkBlue"
                        hover="default"
                        rounded="circle"
                        className="w-5/6 border mx-auto text-center"
                        >
                        Resolve
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default IssueContainer;