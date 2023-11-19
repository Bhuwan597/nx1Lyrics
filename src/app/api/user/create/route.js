import { NextResponse } from "next/server";
import connect from "../../../../../utils/mongodb_connect";
import User from "../../../../models/user";
import { generateToken } from "../../../../../utils/generateToken";

export async function POST(request) {
  connect()
  let userData= null;
  try{
    userData = await request.json();
  }catch(error){
    Error(error.message)
  }
  if(!userData){
      return NextResponse.json({error: "All fields are required."}, {status: 400})
    }

  if(!userData.secret || userData.secret !== process.env.USER_SECRET) return  NextResponse.json({error: "Fuck you!"}, {status: 401})
  const dateTime = new Date();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDateTime = dateTime.toLocaleString("en-US", options);
  try {    
       let user = await User.create({
        ...userData,
        createdOn : formattedDateTime,
    
      })
      return NextResponse.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      }, {status: 201})
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}