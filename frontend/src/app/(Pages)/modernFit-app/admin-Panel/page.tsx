import React from "react";
import SearchBar from "./components/searchBar";
import { Button } from "@/app/components/UI/Button";
import IssueContainer from "./components/issueContainer";
import UserContainer from "./components/userContainer";

const adminPanel: React.FC = () => {
    let issue = "Lorem ipsum dolor sit amet";
    let time = "10:30";
    let date = "03/12/21";
    let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus";
    let name = "John Smith";
    let permission = "Member";
    let email = "johnsmith@example.com";
    let profileImage = "https://placehold.co/300x300";
    let atPos = email.lastIndexOf("@");
    
    let emailFirstHalf = email.substring(0, atPos - 4)
    let emailSecondHalf = email.substring(atPos - 2, email.length)

    return (
        <>
            <div className="text-blue-200 w-5/6 mx-auto mt-4 mb-4">
                <div className="w-5/6 mx-auto mt-4 mb-4 p-1 bg-white border-solid border-2 border-blue-200 rounded-xl">
                    <h2 className="font-bold text-center text-lg mt-4 mb-4">System Flagged Issues</h2> 
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6 max-h-64 overflow-y-scroll">
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                        <IssueContainer
                        issue={issue}
                        description={description}
                        date={date}
                        time={time}                   
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        shadow="default"
                        size="small"
                        variant="darkBlue"
                        hover="hoverLightBlue"
                        rounded="circle"
                        className="w-5/6 border mx-auto text-center"
                        >
                        Create User
                    </Button>
                </div>
                <div className="">
                    <h2 className="w-5/6 mx-auto mt-4 mb-4 font-bold text-xl">users</h2>
                    <div className="w-5/6 mx-auto"><SearchBar/></div>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6">
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                        <UserContainer
                            name={name}
                            permission={permission}
                            email={email}
                            profileImage={profileImage}
                        />
                    </div>
                </div>
            </div>
        </>
    )

};

export default adminPanel;