"use client"
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useToast } from '@chakra-ui/react';

const Page = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleLogin = async ()=>{
    if(!email || !password) return
    setLoading(true)
    try {
      const {data} = await axios.post('/api/user/login', {
        email: email,
        password: password
      })
      localStorage.setItem('adminInfo', JSON.stringify(data))
      toast({
        title: "Login Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      router.push('/admin/dashboard')
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setEmail('')
    setPassword('')
    setLoading(false)
  }
  return <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-gray-900">Admin Login - nx1Lyrics</h1>
      <p className="leading-relaxed mt-4">Admin login is required to post the lyrics and to organize the contents of the website nx1Lyrics.com</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=> setEmail(e.target.value)}/>
      </div>
      <div className="relative mb-4">
        <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=> setPassword(e.target.value)}/>
      </div>
      <Button isLoading={loading} colorScheme={'teal'} onClick={handleLogin}>Login</Button>
      <p className="text-xs text-gray-500 mt-3">Support: v1acharya34@gmail.com</p>
    </div>
  </div>
</section>
  </>
}

export default Page