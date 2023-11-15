import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <>
        <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to nx1Lyrics,</h1>
      <p class="mb-8 leading-relaxed">your premier destination for song lyrics. Dive into a world of musical storytelling, where every word becomes a melody. Explore lyrics from a diverse range of songs. Let nx1Lyrics be your lyrical companion.</p>
      <div class="flex w-full md:justify-start justify-center items-end">
        <div class="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-3/4">
          <input type="text" id="hero-field" name="hero-field" class="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Search</button>
      </div>
      <p class="text-sm mt-2 text-gray-500 mb-8 w-full text-left">Enter artist name or song title</p>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <h2 className='text-left font-extrabold underline text-2xl'>Recently Uploaded</h2>
      <div class="flex-grow">
          <a  href='/see-you-again' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
      <div class="flex-grow">
          <a  href='/' class="mt-3 text-indigo-500 inline-flex items-center">
          <h2 class="text-blue-700 text-lg title-font font-medium mb-3">See you again - Charlie Puth feat Wiz Khalifa</h2>
          </a>
        </div>
    </div>
  </div>
</section>
    </>
  )
}

export default HeroSection