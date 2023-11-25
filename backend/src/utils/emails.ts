import NodeMailer from "nodemailer";
import { transporter } from "../index";
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

export { sendEmail, SendVerificationEmailForRegistration, LoginEmail };
