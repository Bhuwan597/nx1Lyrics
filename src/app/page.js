import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Popular from '@/components/Popular'
import Navbar from '@/components/Navbar'
import connect from '../../utils/mongodb_connect'
export default function Home() {
  connect()
  return (<>
  <Navbar/>
  <HeroSection/>
  <Popular/>
  <Footer/>
  </>
  )
}
export const metadata = {
  title: 'nx1Lyrics  |  Search for songs lyrics ends here.',
  description: 'Ultimate place to find all the lyrics of popular songs.',
  keywords: 'lyrics',
}