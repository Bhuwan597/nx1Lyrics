import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import verifyToken from "../../../../../utils/verifyToken";
import Users from "@/models/user";
import bcrypt from 'bcryptjs'
export async function PATCH(request) {
  try {
    const toUpdate = await request.json();
    const jwtValue = cookies().get("jwt")?.value;
    const idFromCookies = (await verifyToken(jwtValue)).payload.id;
    if (!jwtValue)
      return NextResponse.json(
        { error: true, message: "Invalid Request" },
        { status: 400 }
      );
    if (!idFromCookies)
      return NextResponse.json(
        { error: true, message: "You are not permitted to change password" },
        { status: 400 }
      );
    const idFromHeader = await request.headers.get("id");
    if (idFromCookies !== idFromHeader)
      return NextResponse.json(
        { error: true, message: "You are not permitted to change password" },
        { status: 400 }
      );
    let user = await Users.findById(idFromHeader);
    const flag = await user.matchPassword(toUpdate.password);
    if (!flag)
      return NextResponse.json(
        { error: true, message: "Old Password doesnot match" },
        { status: 400 }
      );
      const salt = await bcrypt.genSalt(10)
      const hashedPassowrd = await bcrypt.hash(toUpdate.newPassword, salt)
    user = await Users.findOneAndUpdate(
      {_id : idFromHeader},
      {
        fullName: toUpdate.fullName,
        password: hashedPassowrd,
      },
      { newDocument: true }
    ).select("-password");
    let response = NextResponse.json(user, {status: 200})
    response.cookies.set({
     name: 'jwt',
     value: null,
     maxAge: 0,
     httpOnly:true,
    })
    return response
  } catch (error) {
    return NextResponse.json({ error: true }, { status: 400 });
  }
}
