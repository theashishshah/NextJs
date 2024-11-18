/* eslint-disable prefer-const */
import { User } from "@/models/userModel";
import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

console.log("database is connected");

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("List of data getting from user: ", reqBody);
    let { email, password } = reqBody;

    // check if user is giving password and mail or not?
    email = email.trim().replace(/\s+/g, "");
    if (!password) {
      throw new Error("Yo, where's the password? 🔒");
    }
    if (!email) {
      throw new Error("Bruh, gotta have an email address. 🤷‍♂️");
    }

    // now check if user exist or not?
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    // now user exist, validate user's password and other feilds if required?
    const validatePassword = await bcryptjs.compare(password, user.password);
    console.log("user password validation value", validatePassword);

    if (!validatePassword) {
      return NextResponse.json(
        { error: "Oops! That password's a no-go. Try again?" },
        { status: 401 }
      );
    }

    // now after email and password is verified then we can send the token to user to their cookies so that they don't have to login again but not into local storage because user can modify it

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    };

    // create token and send it to user
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log("How the token look like", token);

    // create response
    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    // set token to user's cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "internal server error" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ error: "unknown error" }, { status: 500 });
    }
  }
}
