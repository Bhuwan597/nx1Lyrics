import { NextResponse } from "next/server";
import connect from "../../../../utils/mongodb_connect";
import Lyrics from "../../../models/lyric";
import Singer from "../../../models/singer";
import Users from "../../../models/user";
import verifyToken from "../../../../utils/verifyToken";

await connect()
export async function POST(request) {
  let lyricsData= null;
  try{
      lyricsData = await request.json();
  }catch(error){
    Error(error.message)
  }
  if(!lyricsData){
      return NextResponse.json({error: "Invalid Process"}, {status: 400})
    }
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
      const lyrics = await Lyrics.create({
        ...lyricsData,
        postedOn : formattedDateTime,
    
      });
      return NextResponse.json(lyrics, {status: 201})
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}


export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const search = params.get('search');
  
  if(!search) return NextResponse.json(await Lyrics.find({isPublished:true}).sort({ postedOn: 'desc'}).populate('singers'), {status:200})
  if(search === 'submit-requests') {
    const BearerToken = await request.headers.get("authorization");
    if (!BearerToken) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    try {
      const BearerTokenValue = BearerToken.split(" ")[1];
      const decoded = await verifyToken(BearerTokenValue);
      if (!decoded.payload.id) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.json(await Lyrics.find({isPublished:false}).sort({ postedOn: 'desc', }).limit(20).populate('singers'), {status:200})
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
  if(search === 'popular') {
    return NextResponse.json(await Lyrics.find({isPublished:true}).sort({ views: 'desc', }).limit(10).populate('singers'), {status: 200}) 
  }

   // Fetch singers that match the search criteria
   const matchedSingers = await Singer.find({ fullName: { $regex: search, $options: 'i' } });

   // Get the IDs of the matched singers
   const matchedSingerIds = matchedSingers.map(singer => singer._id);

  const keywords = {
    isPublished:true,
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { singers: { $in: matchedSingerIds } },
      { albumName: { $regex: search, $options: 'i' } },
      { writers: { $regex: search, $options: 'i' } },
      { composers: { $regex: search, $options: 'i' } },
      { artists: { $regex: search, $options: 'i' } },
      
    ],
  };
  

  try {
    let searchResults = await Lyrics.find(keywords).limit(5).populate('singers')
    searchResults = await Users.populate(searchResults,{path: 'postedBy', select:'-password'})
    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request){
  try {
    const lyricsData = await request.json()
    const params = request.nextUrl.searchParams;
    const id = params.get('id');
    const updatedLyrics = await Lyrics.findByIdAndUpdate(id,{...lyricsData},{newDocument:true})
    return NextResponse.json(updatedLyrics, {status:200})
    
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({error:error.message}, {status:400})
  }
}

export async function DELETE(request){
  try {
    const id = await request.headers.get('id')
    const lyrics = await Lyrics.findByIdAndDelete(id)
    return NextResponse.json(lyrics, {status:200})
  } catch (error) {
    return NextResponse.json({error:error.message}, {status:400})
  }
}


export async function PATCH (request){
  try {
    const {value,id}= await request.json()
    const toUpdate = value?{
      $inc : {'likes' : 1}
    }:{
      $inc : {'dislikes' : 1}
    }
    console.log(toUpdate)
    const updatedData = await Lyrics.findByIdAndUpdate(id, toUpdate,{newDocument:true})
    return NextResponse.json(updatedData,{status:200})
  } catch (error) {
    return NextResponse.json({error:error.message}, {status:400})
  }
}