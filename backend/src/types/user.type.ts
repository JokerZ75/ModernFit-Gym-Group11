type UserType = {
    _id: string;
    Access_pin: number;
    Name: string;
    Email: string;
    Phone_number: number;
    Password: string;
    Profile_picture: string;
    Height: number;
    Weight: number;
    DOB: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default UserType;