import React from "react";
import { Button } from "@/app/components/UI/Button";
import AutoComplete from "@/app/components/UI/AutoComplete";
import AssignedUser from "./components/assignedUser";
import UnassignedUser from "./components/unassignedUser";
import SearchBar from "@/app/components/searchBar";

const myUsers: React.FC = () => {
    let profileImage = "https://placehold.co/300x300"
    let id = "12345"
    let firstName = "John"
    let lastName = "Smith"
    let height = "5'8"
    let weight = 165
    let goals = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa magna, viverra sed venenatis vitae, blandit vel mi. Donec non."
    if (goals.length > 30)
    {
        goals = goals.slice(0, 30);
        goals += "...";
    }


    return (
        <>
            <div className="text-blue-200 w-3/4 mx-auto mt-4 mb-4 ">
                <div className="font-bold text-2xl">
                    my users
                </div>
                <div className="">
                    <SearchBar />
                </div>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6">
                    <AssignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                    <AssignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                    <AssignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                    <AssignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                    <AssignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                </div>

                <div className="font-bold text-2xl">
                    waiting users
                </div>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-x-6">
                    <UnassignedUser
                    User_id={id}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    goals={goals}
                    height={height}
                    weight={weight}
                    />
                </div>
            </div>
        </>
    )

};

export default myUsers;
