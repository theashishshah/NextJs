import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    // get token from the user's cookies

    const token = request.cookies.get("token")?.value || "";
    console.log("how to token values look like", token);

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
    
  } catch (error: any) {
    throw new Error(
      "there is some problem in getDataFromToken function",
      error
    );
  }
}
