import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/lib/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/userModel";

connect();
console.log("database is connected in aboutuser route file");

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById({ _id: userId }).select(
      "-password -isAdmin"
    );
    return NextResponse.json(
      { message: "User found", userData: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong in aboutuser route file.",
        error: error,
      },
      { status: 400 }
    );
  }
}
