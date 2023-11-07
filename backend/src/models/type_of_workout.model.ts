import mongoose from "mongoose";

const Schema = mongoose.Schema;

// May not need this model

const typeOfWorkoutSchema = new Schema({
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Avg_calories_burned:{
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

const TypeOfWorkout = mongoose.model("TypeOfWorkout", typeOfWorkoutSchema);

export default TypeOfWorkout;

