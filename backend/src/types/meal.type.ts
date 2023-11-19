type meal = {
    User_id: string;
    Meal_desc: string;
    Portion: number;
    Calories_intake: number;
    Catagory_id: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default meal;