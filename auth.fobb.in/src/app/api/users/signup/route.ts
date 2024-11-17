// import { connect } from "../../../../dbConfig/dbConfig.ts"
import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { email, username, name, password } = reqBody;

    if (!email || !username || !name || !password) {
      const missingFields: string[] = [];

      if (!email) missingFields.push("email");
      if (!username) missingFields.push("username");
      if (!name) missingFields.push("name");
      if (!password) missingFields.push("password");

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(",")}`);
      }
    }

    // first check if user already exists or not?

    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { error: `User already exists` },
        { status: 400 }
      );
    }

    // now it is confirm that user not exist then hash the password now
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create a new user and save it into database
    const newUser = new User({
      username: username,
      email: email,
      fullName: name,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        message: `Created user successfully`,
        success: true,
        savedUser,
      },
      { status: 200 }
    );


  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "unknown error" }, { status: 500 });
    }
  }
}
