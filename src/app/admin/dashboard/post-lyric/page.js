"use client"
import LyricsForm from '@/components/adminComponents/LyricsForm'
import axios from 'axios'
import React from 'react'

const page = () => {
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
    <LyricsForm name='post' action={handlePost}/>
  </>
}

export default page