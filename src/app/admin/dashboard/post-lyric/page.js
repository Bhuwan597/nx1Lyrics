"use client"
import LyricsForm from '@/components/adminComponents/LyricsForm'
import axios from 'axios'
import React from 'react'

const Page = () => {
  async function handlePost(lyricsData){
    try {
      const token = JSON.parse(localStorage.getItem('adminInfo'))?.token
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization : `Bearer ${token}`
          }
      }
      const {data} = await axios.post('/api/lyrics',lyricsData, config)
      return data
  } catch (error) {
      return console.log(error.message)
  }
  }
  return <>
  <h1 className="text-2xl text-center m-10 capitalize">Post a Song Lyric</h1>
    <LyricsForm editable={true} name='post' action={handlePost}/>
  </>
}

export default Page