import { NextResponse } from "next/server";
import connect from "../../../../utils/mongodb_connect";
import Feedbacks from "../../../models/feedback";

 await connect();
export async function GET(request) {
  try {
    const feedback = await Feedbacks.find()
      .sort({ createdAt: "desc" })
      .limit(20)
    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(request) {
  try {
    const idsToUpdate = await request.json();
    const result = await Feedbacks.updateMany(
      { _id: { $in: idsToUpdate } },
      { $set: { isSeen: true } }
    );
    return NextResponse.json(result, {status:200})
  } catch (error) {
    NextResponse.json({ error: true }, { status: 400 });
  }
}
export async function POST(request) {
  try {
    const data = await request.json();
    if(!data) return NextResponse.json({ error: true }, { status: 400 });
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
    const feedback = await Feedbacks.create({...data, date: formattedDateTime});
    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request){
  const idsToUpdate = await request.headers.get('idToDelete').split(',')
  try {
    const idsToUpdate = await request.headers.get('idToDelete').split(',')
    const result = await Feedbacks.deleteMany(
      { _id: { $in: idsToUpdate } }
    );
    return NextResponse.json(result, {status:200})
  } catch (error) {
    NextResponse.json({ error: true }, { status: 400 });
  }

}