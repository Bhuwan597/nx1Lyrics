import Link from 'next/link'
import React from 'react'

const Popular = ({lyrics}) => {
  return (
   <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 border-b-2">Popular Songs</h1>
    </div>
    <div className="flex flex-wrap -m-4 justify-center">

{lyrics.map((l)=>{
  return  <div className="lg:w-1/3 sm:w-1/2 p-4">
        <Link href={`/${l.slug}`} className="flex relative">
          <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src={l.coverPicture}/>
          <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{l.singers.map((singer)=>(` ${singer.fullName} `))}</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{l.title}</h1>
          </div>
        </Link>
        <Link href={`/${l.slug}`}>
          <h2 className="text-black text-center text-lg mt-2 underline">{l.title}</h2>
          </Link>
      </div>
})}
    </div>
  </div>
</section>
   </>
  )
}

export default Popular