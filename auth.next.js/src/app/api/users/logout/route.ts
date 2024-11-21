import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Log out successfully, Party!",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        messageToUser: "Not able to log out, server side error",
      },
      {
        status: 500,
      }
    );
  }
}
