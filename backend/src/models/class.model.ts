import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;


const classSchema = new Schema({
    Owner_id:{
        type: ObjectId,
        required: true,
        ref: "Staff"
    },
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Date:{
        type: Date,
        required: true,
        trim: true,
        minlength: 3
    },
    Time:{
        type: Date,
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
    Branch_id:{
        type: ObjectId,
        required: true,
        ref: "Branch"
    },
    Interested_users:{
        type: Array(ObjectId),
        required: false,
        trim: true,
        minlength: 3,
        ref: "User"
    },

},{
    timestamps: true,

});

const Class = mongoose.model("Class", classSchema);

export default Class;