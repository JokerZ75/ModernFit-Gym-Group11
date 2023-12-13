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
    html: `<a href="http://localhost:${process.env.PORT}/user/confirm/${token}" target="_blank">Click here to verify your email address and create your account</a>`,
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
    text:
      "Your login code is: " + token + ".\n This code will expire in 5 minutes",
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

const RecoverEmail = async (email: string, url: string) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Recovery",
    text: "Update your password at the following location " + url,
  };

  await transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

const updatePassword = async (email: string) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Updated",
    text: "Your password has been updated",
  };

  await transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

// const generatedPassword = (length: number): string => {
//   const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=[]<>?';
//   let password = '';

//   for(let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     password += characters.charAt(randomIndex)
//   }
//   return password;
// }

const emailDownTime = async (emails: string[], Description: string) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: "Email Downtime",
    text: Description,
  };

  await transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

export {
  sendEmail,
  SendVerificationEmailForRegistration,
  LoginEmail,
  RecoverEmail,
  updatePassword,
  emailDownTime,
};
