import mongoose from "mongoose";

const Schema = mongoose.Schema;

// May not need this model


const branchSchema = new Schema({
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Address:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;