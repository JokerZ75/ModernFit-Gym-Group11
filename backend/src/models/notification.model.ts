import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    Title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    Description:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    isSystemFlagged:{
        type: Boolean,
        required: true,
        trim: true,
        minlength: 3
    },
    Recievers:{
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

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;