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
      return NextResponse.json({error: "Invalid Credentials"}, {status: 401})
    }
  try {    
       let user = await User.findOne({
        email : userData.email
       })
       if(user && (await user.matchPassword(userData.password))){
        let jwtToken = generateToken(user._id)
        let userInfo = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          picture: user.picture,
          token: jwtToken,
         }
         let response = NextResponse.json(userInfo, {status: 200})
         response.cookies.set({
          name: 'jwt',
          value: jwtToken,
          maxAge: 7*24*60*60,
          httpOnly:true,
         })
           return response;
        }else{
            return NextResponse.json({error: "Invalid Credentials"}, {status: 401})
       }
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}
