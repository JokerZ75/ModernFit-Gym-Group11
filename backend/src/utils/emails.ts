import NodeMailer from "nodemailer";
import { transporter } from "../index";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (email: string, subject: string, text: string) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

const SendVerificationEmailForRegistration = async (
    email: string,
    token: string
) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email address",
    text: "Please click the link below to verify your email address",
    html: `<a href="http://localhost:${process.env.PORT}/user/confirm/${token}">Click here to verify your email address and create your account</a>`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

const LoginEmail = async (email: string, token: string) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login 2FA",
    text: "Your login code is: " + token + ".\n This code will expire in 5 minutes",
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

const RecoverEmail = async (email: string,) => {
  const newPassword = generatedPassword(12)

  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Recovery",
    text: "Your new password is: " + newPassword,
  };

  try {
    await updatePassword(email, newPassword);
    await transporter.sendMail(mailData);
    console.log(`Password recovery email sent to ${email}`);
  } catch (error) {
    console.error(`Error recovering password: ${error}`);
    throw error;
  }
};

const updatePassword = async (email: string, newPassword: string): Promise<void> => {
  try {
    const User = mongoose.model("User");
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();

    console.log(`Password updated for user with email: ${email}`);
  } catch (error) {
    throw error;
  }
};

const generatedPassword = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=[]<>?';
  let password = '';

  for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex)
  }
  return password;
}

export { sendEmail, SendVerificationEmailForRegistration, LoginEmail, RecoverEmail };