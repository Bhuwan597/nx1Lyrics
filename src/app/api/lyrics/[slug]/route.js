import connect from "../../../../../utils/mongodb_connect";
import Lyrics from '@/models/lyric'
import Users from '@/models/user'
import Singers from '@/models/singer'
import { NextResponse } from "next/server";

connect()
export async function GET(request,{ params }) {
  try {
    const slug = await params.slug
    // if(slug!=='all'){
      
      let searchResults = await Lyrics.findOneAndUpdate({slug:slug, isPublished:true}, {$inc : {'views' : 1}}).populate("singers");
      searchResults = await Users.populate(searchResults, {
        path: "postedBy",
        select: "-password",
      });
      return NextResponse.json(searchResults, { status: 200 });


    // }else{
    //   let searchResults = await Lyrics.find().populate("singers");
    //   searchResults = await Users.populate(searchResults, {
    //     path: "postedBy",
    //     select: "-password",
    //   });
    //   return NextResponse.json(searchResults, { status: 200 });
    // }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
