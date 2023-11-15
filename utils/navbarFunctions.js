"use client"

import axios from "axios"

export async function addSinger(singerData){
    try {
        const token = JSON.parse(localStorage.getItem('adminInfo'))?.token
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.post('/api/singer',singerData, config)
        return data
    } catch (error) {
        return console.log(error.message)
    }
   
}

export async function addAlbum(albumData){
    try {
        const token = JSON.parse(localStorage.getItem('adminInfo'))?.token
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.post('/api/album',albumData, config)
        return data
    } catch (error) {
        return console.log(error.message)
    }
   
}

export async function findSingers(query){
    try {
        const {data} = await axios.get(`/api/singer?search=${query}`)
        return data
    } catch (error) {
        console.log(error.message)
    }
}
