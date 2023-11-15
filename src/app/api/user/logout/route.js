import { NextResponse } from "next/server";

export async function GET (request){
    let response = NextResponse.json({success:true}, {status:200})
    response.cookies.set({
        name: 'jwt',
        value: null,
        maxAge: Date.now(0),
        httpOnly:true,
       })
    return response
}