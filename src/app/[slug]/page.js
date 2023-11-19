import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Details from '@/components/Details'

const page = async ({params}) => {
  const lyrics = await getLyrics(params.slug)
  return <>
  <Navbar/>
    <Details lyricsProps={lyrics}/>
    <Footer/>
  </>
}

export async function getLyrics(slug) {
  if (slug === 'favicon.ico') return;
  try {
    const response = await fetch(`${process.env.HOST_URL}/api/lyrics/${slug}`);
    const data = await response.json();
    if(data.error) return null
    return data
  } catch (error) {
    console.log('Error fetching lyrics:', error);
    return null;
  }
}
export async function generateMetadata({params}){
  try {
    let lyricsData = await getLyrics(params.slug)
    if(!lyricsData) return
    return {
      title : lyricsData.title + ' by ' + lyricsData.singers.map((singer)=>`${singer.fullName} `),
      description: lyricsData.lyrics.slice(0,10).map((l)=>`${l} `),
      tags: lyricsData.title + ' , ' + lyricsData.tags.map((t)=>`${t},`)
    }
    
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for doesn't exists."
    }
  }

}
export default page