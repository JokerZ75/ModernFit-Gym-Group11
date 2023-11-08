import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Duration:{
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    },
    Type_of_workout:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Typeofworkout"
    },
    Calories_burned:{
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    }, 
},{
    timestamps: true,
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;

