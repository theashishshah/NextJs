import { connect } from "@/lib/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";

connect();
console.log("db is connected in verify email directory");

export async function POST(request: NextRequest) {
  try {
    // grab the token
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token in the verify mail file\n", token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("am I getting user or not", user);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong in verify email file",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
