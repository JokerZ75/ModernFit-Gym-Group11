import mongoose from "mongoose";


const Schema = mongoose.Schema;

// May not need this model

const mealCatagorySchema = new Schema({
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Avg_calories:{
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

const MealCatagory = mongoose.model("MealCatagory", mealCatagorySchema);

export default MealCatagory;