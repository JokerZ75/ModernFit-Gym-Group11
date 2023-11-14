import React from "react";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";

const Register: React.FC = () => {
    return (
        <>
        <div>
            <div className="text-blue-100 text-center text-5xl"><h1><b>Register</b></h1></div>
            <form className="text-center">
                <b>Name: </b>
                <input className="inputField" type="text" placeholder="Name" id="Name" required></input><br></br>
                <b>Email: </b>
                <input className="inputField" type="email" placeholder="example@example.com" id= "email" required></input><br></br>
                <b>Gym Location: </b>
                <input className="inputField" type="text" placeholder="Gym Location" id="Gym Location" required></input><br></br>
                <b>Mobile Number: </b>
                <input className="inputField" type="tel" placeholder="Mobile Number" id="Mobile" required></input><br></br>
                <b>Password: </b>
                <input className="inputField" type="password" placeholder="Password" id="password_1" required></input><br></br>
                <b>Confirm Password: </b>
                <input className="inputField" type="password" placeholder="Password" id="password_2" required></input><br></br>
                <Button className="flex mt-2 mb-4 w-3/4 border mx-auto"
                    type="submit"
                    shadow="default"
                    size="default"
                    variant="default"
                    hover="default"
                    rounded="circle">
                    <div className="mx-auto"><b>Submit</b></div>
                </Button>
            </form>
            <Link href="/login" className="flex mt-2 mb-4">
                <Button
                    type="button"
                    shadow="default"
                    size="default"
                    variant="lightBlue"
                    hover="hoverDarkBlue"
                    rounded="circle"
                    className="w-3/4 border mx-auto">
                    <b>Login</b>
                </Button>
            </Link>
        </div>
        </>
    );
};

export default Register;
