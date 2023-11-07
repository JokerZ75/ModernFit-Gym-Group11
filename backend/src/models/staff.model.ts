import mongoose from "mongoose";

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    Position:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,

});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;