import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    Meal_desc:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Portion:{
        type: Number,
        required: true,
        trim: true,
        min: 1
        },
    Calories_intake:{
        type: Number,
        required: true,
        trim: true,
        min: 1
    },
    Catagory_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MealCatagory"
    },
},{
    timestamps: true,
});