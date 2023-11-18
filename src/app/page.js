import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Popular from '@/components/Popular'
import Navbar from '@/components/Navbar'
import connect from '../../utils/mongodb_connect'
export default async function Page() {
  const popularSixLyrics = (await getPopularLyrics()).slice(0,5)
  connect()
  return (<>
  <Navbar/>
  <HeroSection/>
  <Popular lyrics={popularSixLyrics}/>
  <Footer/>
  </>
  )
}



export async function getPopularLyrics(){
  try {
    const response = await fetch('http://localhost:3000/api/lyrics?search=popular')
    return await response.json()
  } catch (error) {
    return []
  }
}

export const metadata = {
  title: 'nx1Lyrics  |  Search for songs lyrics ends here.',
  description: 'Ultimate place to find all the lyrics of popular songs.',
  keywords: 'lyrics',
}