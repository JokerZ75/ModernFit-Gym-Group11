import mongoose from "mongoose";

const Schema = mongoose.Schema;

const nutritionalPostSchema = new Schema({
    Staff_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Staff"
    },
    Title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Catagory_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MealCatagory"
    },
    Average_calories:{
        type: Number,
        required: true,
        trim: true,
        min: 1
    },
    Image:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Content:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
}, { timestamps: true });

const NutritionalPost = mongoose.model("NutritionalPost", nutritionalPostSchema);

export default NutritionalPost;