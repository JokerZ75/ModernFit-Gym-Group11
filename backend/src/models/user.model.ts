import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  Access_pin: {
    type: Number,
    required: true,
    trim: true,
    minlength: 6,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  Phone_number: {
    type: Number,
    required: true,
    trim: true,
    minlength: 10,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  Profile_picture: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
  },
  Height: {
    type: Number,
    required: false,
    trim: true,
    minlength: 2,
  },
  Weight: {
    type: Number,
    required: false,
    trim: true,
    minlength: 2,
  },
  DOB: {
    type: Date,
    required: false,
    trim: true,
  },
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
