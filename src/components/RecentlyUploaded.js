import Link from 'next/link';
import React from 'react'
import crypto from 'crypto'

const RecentlyUploaded = async() => {
    const latestFiveLyrics = (await getLatestLyrics()).slice(0,4)
  return <>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <h2 className="text-left font-extrabold underline text-2xl">
              Recently Uploaded
            </h2>

            {latestFiveLyrics.map((lyrics) => (
              <>
                <div
                  key={crypto.randomBytes(20).toString("hex")}
                  className="flex-grow"
                >
                  <Link
                    href={`/${lyrics.slug}`}
                    className="mt-3 text-indigo-500 inline-flex items-center"
                  >
                    <h2 className="text-blue-700 text-lg title-font font-medium mb-3">
                      {lyrics.title} by{" "}
                      {lyrics.singers.map((singer, key) => {
                        if (key === lyrics.singers.length - 1)
                          return ` ${singer.fullName}`;
                        return key === lyrics.singers.length - 2 &&
                          key !== lyrics.singers.length - 1
                          ? `${singer.fullName} and `
                          : `${singer.fullName}, `;
                      })}
                    </h2>
                  </Link>
                  <br />
                  <span>
                    {lyrics.language} Song, Released On: {lyrics.releasedDate}{" "}
                    {lyrics.albumName && `From: Album ${lyrics.albumName} `}{" "}
                  </span>
                </div>
              </>
            ))}
          </div>
  </>
}
export async function getLatestLyrics(){
    try {
      const response = await fetch('http://localhost:3000/api/lyrics')
      return await response.json()
    } catch (error) {
      return []
    }
  }
export default RecentlyUploaded
