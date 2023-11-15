import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Details from '@/components/Details'

const page = ({params}) => {
  return <>
  <Navbar/>
    <Details/>
    <Footer/>
  </>
}

export default page