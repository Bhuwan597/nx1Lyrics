import { NextResponse } from "next/server";
import connect from "../../../../utils/mongodb_connect";
import Notifications from "../../../models/notification";

 await connect();
export async function GET(request) {
    try {
        const notification = await Notifications.find({}).sort({createdAt: 'desc'}).limit(10)
        return NextResponse.json(notification, {status:200})
    } catch (error) {
        return NextResponse.json({error:true},{status:400})
    }
}
export async function PATCH(request) {
    try {
        const notificationData = await request.json()
        const idToUpdate = await notificationData?.map((n)=> n._id)
        const notification = await Notifications.updateMany(
            { _id: { $in: idToUpdate } },
            { $set: { isSeen: true } }
        )
        return NextResponse.json(notification, {status:200})
    } catch (error) {
        return NextResponse.json({error:true},{status:400})
    }
}