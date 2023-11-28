import { Request, Response } from "express";
import User from "../models/user.model";
// import all models that have a relationship with the user model
import Workout from "../models/workout.model";
import Meal from "../models/meal.model";
import Staff from "../models/staff.model";
import Class from "../models/class.model";
import DietPlan from "../models/diet_plan.model";
import WorkoutPlan from "../models/workout_plan.model";
import NutritionalPost from "../models/nurtional_post.model";
import Notification from "../models/notification.model";
import {
  getCacheAsJson,
  setCacheAsJson,
  setCacheAsJsonWithExpire,
  setCacheWithExpire,
} from "../utils/cache";
import bcrypt from "bcrypt";
import { SendVerificationEmailForRegistration } from "../utils/emails";
import { RequestWithUser } from "../types/Request.interface";
import dotenv from "dotenv";
import { deleteFile } from "../utils/files";

dotenv.config();

const getUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  await User.findById(user?.id)
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      const returnJSON = {
        Name: user.Name,
        Access_pin: user.Access_pin,
        Email: user.Email,
        Phone_number: user.Phone_number,
        Branch_id: user.Branch_id,
        Profile_picture: `http://localhost:${process.env.PORT}/public/profileImages/${user.Profile_picture}.jpg`,
        Height: user.Height,
        Weight: user.Weight,
        Gym_Goals: user.Gym_Goals,
      };
      res.status(200).json(returnJSON);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const getAllUsers = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  // check if user is admin
  const isAdmin = await Staff.findOne({ User_id: user.id })
    .then((staff) => {
      if (staff?.Position === "Admin") {
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
  if (!isAdmin) {
    return res.status(400).json({ msg: "User is not admin" });
  }
  await User.find()
    .then(async (users) => {
      let userJSON = await JSON.parse(JSON.stringify(users));
      if (!userJSON) {
        return res.status(200).json({ msg: "No users" });
      }
      userJSON = await Promise.all(
        userJSON.map(async (user: any) => {
          let staffPoition = (await Staff.findOne({ User_id: user._id }))
            ?.Position;
          if (
            !staffPoition ||
            staffPoition === null ||
            staffPoition === undefined
          ) {
            staffPoition = "Member";
          }

          delete user.Password;
          delete user.Access_pin;
          delete user.Phone_number;
          delete user.Branch_id;
          user.Profile_picture = `http://localhost:${process.env.PORT}/public/profileImages/${user.Profile_picture}.jpg`;
          user.Position = staffPoition;
          return user;
        })
      );
      res.status(200).json(userJSON);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const updateUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const {
    Name,
    Email,
    Phone_number,
    Branch_id,
    Profile_picture,
    Height,
    Weight,
    Gym_Goals,
  } = req.body;
  if (!Name || !Email || !Phone_number || !Branch_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await User.findByIdAndUpdate(
    user.id,
    {
      Name,
      Email,
      Phone_number,
      Branch_id,
      Profile_picture,
      Height,
      Weight,
      Gym_Goals,
    },
    { new: true }
  )
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      return res.status(200).json({ msg: "User updated" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const updateProfilePicture = async (req: any, res: Response) => {
  const user = req.user;
  if (!user) {
    await deleteFile(`./public/profileImages/undefined.jpg`);
    return res.status(400).json({ msg: "User not found" });
  }
  if (!req.file) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await User.findByIdAndUpdate(
    user.id,
    {
      Profile_picture: `${user.id}`,
    },
    { new: true }
  )
    .then(async (user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        await deleteFile(`./public/profileImages/undefined.jpg`);
        return res.status(200).json({ msg: "No user" });
      }
      return res.status(200).json({ msg: "User updated" });
    })
    .catch(async (err) => {
      await deleteFile(`./public/profileImages/${user.id}.jpg`);
      res.status(400).json({ msg: err });
    });
};

const deleteUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const { Name } = req.body;
  const foundUser = await User.findById(user.id);
  if (!foundUser) {
    return res.status(200).json({ msg: "No user" });
  }
  if (foundUser.Name == Name) {
    // delete all data related to the user
    const isStaff = await Staff.findOne({ User_id: user.id });
    if (isStaff) {
      await Class.deleteMany({ Owner_id: isStaff._id });
      await NutritionalPost.deleteMany({ Staff_id: isStaff._id });
    }
    await Workout.deleteMany({ User_id: user.id });
    await Meal.deleteMany({ User_id: user.id });
    await DietPlan.deleteMany({ User_id: user.id });
    await WorkoutPlan.deleteMany({ User_id: user.id });
    await User.findByIdAndDelete(user.id);
    await Notification.updateMany({
      $pull: { Recievers: user.id },
    });
    await deleteFile(`./public/profileImages/${user.id}.jpg`);
    return res.status(200).json({ msg: "User deleted" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findById(id)
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      const returnJSON = {
        Name: user.Name,
      };
      res.status(200).json(returnJSON);
    })
    .catch((err) => {
      res.status(400).json({ msg: "No user" });
    });
};

const CreateUser = async (req: Request, res: Response) => {
  const { Name, Email, Phone_number, Branch_id, Password } = req.body;
  if (!Name || !Email || !Phone_number || !Branch_id || !Password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // check if user already exists
  await User.findOne({ Email }).then(async (user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Make unique access pin for user
    let unqiue = false;
    let Access_pin = "";
    while (!unqiue) {
      Access_pin = Math.floor(100000 + Math.random() * 900000).toString();
      const foundUser = await User.findOne({ Access_pin });
      if (!foundUser) {
        unqiue = true;
      }
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(Password, salt);

    // Make unqiue token for email verification
    let token = "";
    unqiue = false;
    while (!unqiue) {
      token = Math.floor(100000 + Math.random() * 900000).toString();
      await getCacheAsJson(token).then((data) => {
        if (!data || data == null || data == undefined) {
          unqiue = true;
        }
      });
    }

    setCacheAsJsonWithExpire(
      token,
      {
        Name,
        Email,
        Phone_number,
        Branch_id,
        Password: hash,
        stringPassword: Password,
        Access_pin,
      },
      3600
    );

    await SendVerificationEmailForRegistration(Email, token);
    return res.status(200).json({ msg: "Email sent" });
  });
};

const ConfirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;
  await getCacheAsJson(token).then(async (data) => {
    if (!data) {
      return res.send(
        '<h1 style="color: red;  text-align: center;  text-transform: uppercase;  font-size: 50px;">Registeration failed, bad data</h1>'
      );
    }
    const {
      Name,
      Email,
      Phone_number,
      Branch_id,
      Password,
      Access_pin,
      stringPassword,
    } = data;
    const newUser = new User({
      Name,
      Email,
      Phone_number,
      Branch_id,
      Password,
      Access_pin,
    });
    await newUser
      .save()
      .then((user) => {
        user = JSON.parse(JSON.stringify(user));
        if (!user) {
          // return html page with error
          return res.send(
            '<h1 style="color: yellow;  text-align: center;  text-transform: uppercase;  font-size: 50px;">Registeration failed, Try again later</h1>'
          );
        }
        res.cookie(
          "user-details",
          JSON.stringify({ Email, stringPassword, token })
        );
        return res.redirect("http://localhost:3000/register");
      })
      .catch((err) => {
        res.status(400).json({ msg: err });
      });
  });
};

export default {
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  CreateUser,
  ConfirmUser,
  updateProfilePicture,
  getAllUsers,
};
