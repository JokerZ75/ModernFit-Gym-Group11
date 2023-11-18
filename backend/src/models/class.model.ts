import mongoose from "mongoose";

const Schema = mongoose.Schema;


const classSchema = new Schema({
    Owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Staff"
    },
    Name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 12
    },
    Date:{
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
    Type: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Branch_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Branch"
    },
    Interested_users:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        required: false,
        trim: true,
        minlength: 3,
    },

},{
    timestamps: true,

});

const Class = mongoose.model("Class", classSchema);

export default Class;