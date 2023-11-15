import { connect } from "mongoose";
import { NextResponse } from "next/server";
import User from '../../../../models/user'

export async function GET (request, {params}){
    try {
        connect()
        const user = await User.findOne({
            ...params
        }).select('-password').exec()
        if(!user) return NextResponse.json({error: "No records found"}, {status: 400})
        return NextResponse.json(user, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "No records found"}, {status: 400})
    }
}