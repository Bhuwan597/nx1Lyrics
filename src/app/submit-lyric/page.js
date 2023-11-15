import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const page = () => {
  return (
    <>
      <Navbar />
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-5 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Submit Lyrics
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Filling out this form will send lyrics directly to nx1Lyrics.com
              Team.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Allow up to a week for submissions to be processed.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              The most requested and currently popular lyrics will be processed
              first.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            nx1Lyrics.com Team reserves the right to reject submissions.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">


              <div class="p-2 w-full">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-600">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>



              <div class="p-2 w-full">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-600">
                    Your Email
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>


              <div class="p-2 w-full">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>



              {/* <div class="p-2 w-1/2">
                <div class="relative">
                  <label
                    for="released-data"
                    class="leading-7 text-sm text-gray-600"
                  >
                    Released Date
                  </label>
                  <input
                    type="date"
                    id="released-data"
                    name="released-data"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}


              <div class="p-2 w-full">
                <div class="relative">
                  <label for="singers" class="leading-7 text-sm text-gray-600">
                    Singers
                  </label>
                  <input
                    type="text"
                    id="singers"
                    name="singers"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>



              {/* <div class="p-2 w-full">
                <div class="relative">
                  <label for="writers" class="leading-7 text-sm text-gray-600">
                    Writers
                  </label>
                  <input
                    type="text"
                    id="writers"
                    name="writers"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}



              {/* <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="composers"
                    class="leading-7 text-sm text-gray-600"
                  >
                    Composers
                  </label>
                  <input
                    type="text"
                    id="composers"
                    name="composers"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}



              {/* <div class="p-2 w-full">
                <div class="relative">
                  <label for="artists" class="leading-7 text-sm text-gray-600">
                    Artists
                  </label>
                  <input
                    type="text"
                    id="artists"
                    name="artists"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}



              <div class="p-2 w-full">
                <div class="relative">
                  <label for="language" class="leading-7 text-sm text-gray-600">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>



              {/* <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="duration" class="leading-7 text-sm text-gray-600">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    data-hide-seconds
                    data-duration-max="00:60:60"
                    class="html-duration-picker w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}


              {/* <div class="p-2 w-full">
                <div class="relative">
                  <label for="tags" class="leading-7 text-sm text-gray-600">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div> */}



              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Lyric
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-96 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>



              <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Submit Lyric
                </button>
              </div>
              <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a class="text-indigo-500">nx1Lyrics@email.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
