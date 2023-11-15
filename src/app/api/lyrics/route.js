import { NextResponse } from "next/server";
import connect from "../../../../utils/mongodb_connect";
import Lyrics from "../../../models/lyric";
import Singer from "../../../models/singer";

export async function POST(request) {
  connect()
  let lyricsData= null;
  try{
      lyricsData = await request.json();
  }catch(error){
    Error(error.message)
  }
  if(!lyricsData){
      return NextResponse.json({error: "All fields are required."}, {status: 400})
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
  
  // Fetch singers that match the search criteria
  const matchedSingers = await Singer.find({ fullName: { $regex: search, $options: 'i' } });

  // Get the IDs of the matched singers
  const matchedSingerIds = matchedSingers.map(singer => singer._id);

  // Use the IDs to search for lyrics that have matching singers
  const keywords = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { writers: { $regex: search, $options: 'i' } },
      { composers: { $regex: search, $options: 'i' } },
      { artists: { $regex: search, $options: 'i' } },
      { albumName: { $regex: search, $options: 'i' } },
      { language: { $regex: search, $options: 'i' } },
      { singers: { $in: matchedSingerIds } },
    ],
  };

  try {
    const searchResults = await Lyrics.find(keywords).populate('singers').limit(5);
    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
