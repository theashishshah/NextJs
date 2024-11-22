// domain.com/verifyToken/jfksflsdfjdlfjfkk
// Domain.com/verifyToken?hashedToken=fdkjfsdlfjdsfjflkfj

import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed hashedToken and send it to client as well as in db
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // const user = await User.findOne({ email });
    // user.verifyToken = hashedToken;
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (emailType === "FORGET_PASSWORD") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    // till now we've updated the database with the new Tokens

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODE_MAILER_USERNAME!,
        pass: process.env.NODE_MAILER_PASSWORD!,
      },
    });

    const mailOptions = {
      from: "one@ashish.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Click here to verify your email"
          : "Reset your password",
      text:
        emailType === "VERIFY"
          ? `Please verify your email by clicking the link below:\n\n${hashedToken}`
          : `You requested a password reset. Click the link below to reset your password:\n\n${hashedToken}`,

      html:
        emailType === "VERIFY"
          ? `<p>Please verify your email by clicking the link below:</p><a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">Verify Email.</a>`
          : `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${hashedToken}">Reset Password</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions)
    console.log(mailResponse)
    return mailResponse;
  } catch (error: any) {
    throw new Error(
      "Something went wrong while sending the email",
      error.message
    );
  }
};
