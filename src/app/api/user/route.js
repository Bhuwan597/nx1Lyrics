import { NextResponse } from "next/server";
import connect from "../../../../utils/mongodb_connect";
import User from "../../../models/user";

export async function GET(request) {
  try {
    await connect()
    let users = await User.find().select('-password').exec()
    return NextResponse.json(users, {status: 200})
    
  } catch (error) {
    return NextResponse.json({error:error.message}, {status:400})
  }
}
