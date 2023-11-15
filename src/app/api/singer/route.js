import { NextResponse } from "next/server"
import Singer from '@/models/singer'
import connect from "../../../../utils/mongodb_connect"
connect()
export async function POST (request){
    const singerData = await request.json()
    try {
        if(await Singer.findOne({fullname: singerData.fullName})) return NextResponse.json({error: 'Song Already exists.'}, {status:400})
        const singer = await Singer.create(singerData)
        return NextResponse.json(singer, {status:201})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:400})
    }
}
export async function GET(request){
    const params = request.nextUrl.searchParams
    const search = params.get('search')
    const keywords = {
        $or : [
            { fullName: { $regex: search, $options: 'i' } },
            { nickName: { $regex: search, $options: 'i' } },
            { nationality: { $regex: search, $options: 'i' } },
    ]
    }
    const singers = await Singer.find(keywords).limit(5)
    return NextResponse.json(singers, {status:200})
}